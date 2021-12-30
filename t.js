const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs")
const pretty = require("pretty");
var Regex = require("regex");

app.get('/',(req,res)=>{
  res.end(`
  <h1>Hello World!</h1>
  `)
})

app.get('/tv.m3u',async function(req,res) {
  
  const url = "https://www.bdstory.xyz/search/label/khorkuto?m=1"
  const resou = await axios.get(url)
  var $ = cheerio.load(resou.data);
  const link = $("#Blog1 > div.blog-posts.hfeed.container.post-filter-wrap > div > article > div > div.FreeGalxzw-box > h2 > a").attr('href')
  console.log(`todays link ${link}`)
  
  const date = new Date().getDate()
  
  const ress = await axios.get(link)
  $ = cheerio.load(ress.data);
  const post = $("#Blog1 > div > article > div.post-inner-area > div.post-snip > span.post-date.published").text()
  const pb_pst = post.split(" ")[1].split(',')[0]
  console.log(pb_pst,date)
  if(pb_pst != date){
    console.log('not published')
    const regt = 'https://github.com/sploit30/emni/blob/main/Untitled%2011%201280x720%201.42Mbps%202021-12-30%2017-16-47.mp4?raw=true'
    res.writeHead(200,{
     'Content-Type':'application/x-mpegURL'
    })
    res.end(`#EXTINF:-1 tvg-logo="https://upload.wikimedia.org/wikipedia/en/4/42/Khorkuto.jpg" group-title="Bangladesh",Khorkuto
    ${regt}
    `)
    
  }else{
  const next = $("body").find("#BLOGGER-video-fbd948bdff01633a-15883").attr("src")
  console.log(next)
  const re = await axios.get(next)
  $ = cheerio.load(re.data);
  const data = $('script').html()
  console.log('data asse')

  var text = data.toString()
  console.log(text)
  const reg = new RegExp(/(https:\/\/rr1---sn-[^\s]+[A-D])/gm)
  const read = text.match(reg).toString()
  console.log(read)
  /*res.writeHead(200,{
     'Content-Type' : 'application/mpegurl'
    })*/
  res.contentType('application/x-mpegURL')
  res.end(`#EXTINF:-1 tvg-logo="https://upload.wikimedia.org/wikipedia/en/4/42/Khorkuto.jpg" group-title="Bangladesh",Khorkuto
  ${read}
  `)
  console.log('published')
  }
  

})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
