# Example with random provider
```terraform
provider "random" {}

variable "max_length" {
    default = 5
}

resource "random_integer" "pet_length" {
    min = 1
    max = var.max_length
    keepers = {
        # Generate a new integer each time we switch to a new listener ARN
        listener_arn = var.listener_arn
    }
}

resource "random_pet" "dog" {
    length = random_integer.pet_length.result
}
```