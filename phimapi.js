async function home() {
  const res = await fetch("https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1");
  const data = await res.json();

  return data.items.map(i => ({
    title: i.name,
    url: i.slug,
    poster: i.poster_url
  }));
}

async function detail(url) {
  const res = await fetch(`https://phimapi.com/phim/${url}`);
  const data = await res.json();

  return {
    title: data.movie.name,
    description: data.movie.content,
    poster: data.movie.poster_url
  };
}

async function play(url) {
  const res = await fetch(`https://phimapi.com/phim/${url}`);
  const data = await res.json();

  const server = data.episodes[0].server_data[0];

  return {
    url: server.link_m3u8,
    type: "m3u8"
  };
}
