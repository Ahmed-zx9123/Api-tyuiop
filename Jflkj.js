export default {
  async fetch(request) {
    const { searchParams } = new URL(request.url);
    const blobUrl = searchParams.get("url");

    if (!blobUrl || !blobUrl.includes("github.com") || !blobUrl.includes("/blob/")) {
      return new Response("Invalid or missing 'url' parameter.", { status: 400 });
    }

    const rawUrl = blobUrl
      .replace("https://github.com/", "https://raw.githubusercontent.com/")
      .replace("/blob/", "/");

    return new Response(rawUrl, {
      headers: { "Content-Type": "text/plain" }
    });
  }
};
