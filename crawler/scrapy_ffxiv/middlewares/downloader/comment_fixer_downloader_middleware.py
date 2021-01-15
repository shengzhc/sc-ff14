class ScrapyFfxivDownloaderMiddleware:

    def process_response(self, request, response, spider):
        return response.replace(body=response.body.replace("--!>", "-->"))
