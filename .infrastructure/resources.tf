data "docker_registry_image" "image" {
  name = "${var.registry}/${var.repository}:${var.image_tag}"
}

resource "google_cloud_run_service" "server" {
  name = var.cloud_run_service_name
  location = var.region

  template {
    spec {
      containers {
        image = data.docker_registry_image.image.sha256_digest
        dynamic "env" {
          for_each = var.container_environment_variables
          content {
            name = env.key
            value = env.value
          }
        }
      }
    }
  }

  traffic {
    percent = 100
    latest_revision = true
  }
}

resource "google_cloud_run_service_iam_member" "allUsers" {
  location = google_cloud_run_service.server.location
  project = google_cloud_run_service.server.project
  service = google_cloud_run_service.server.name
  role = "roles/run.invoker"
  member = "allUsers"
}
