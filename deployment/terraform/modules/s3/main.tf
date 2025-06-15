resource "aws_s3_bucket" "this" {
    bucket = var.bucket_name
    # provider = aws.local
    # acl = "private"
}