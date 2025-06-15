output "bucket_list" {
  value = [ for bucket in module.s3_bucket : bucket ]
}

# bucket_list = [
#   {
#     "bucket_arn" = "arn:aws:s3:::test1"
#   },
#   {
#     "bucket_arn" = "arn:aws:s3:::test2"
#   },
# ]

output "bucket_map" {
  value = { for index, bucket in module.s3_bucket : index => bucket.bucket_arn }
}

# bucket_map = {
#   "backup_bucket" = "arn:aws:s3:::test1"
#   "state_bucket" = "arn:aws:s3:::test2"
# }