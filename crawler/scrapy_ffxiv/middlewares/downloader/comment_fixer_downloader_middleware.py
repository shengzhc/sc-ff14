class CommentFixerDownloaderMiddleware:

    def process_response(self, request, response, spider):
        return response.replace(body=response.text.replace("--!>", "-->").encode(encoding=response.encoding))
