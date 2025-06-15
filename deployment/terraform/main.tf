locals {
  buckets = {
    backup_bucket = {
      name = "test1"
    }
    state_bucket = {
      name = "test2"
    }
  }
}

module "s3_bucket" {
    source = "./modules/s3"
    for_each = local.buckets

    bucket_name = each.value.name
}