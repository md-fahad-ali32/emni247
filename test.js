const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs")
var esprima = require('esprima');
const regexpTree = require('regexp-tree');
const pretty = require("pretty");

(async function(){
  const url = "https://www.bdstory.xyz/search/label/khorkuto?m=1"
  const res = await axios.get(url)
  var $ = cheerio.load(res.data);
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
    console.log('https://github.com/sploit30/emni/blob/main/Untitled%2011%201280x720%201.42Mbps%202021-12-30%2017-16-47.mp4?raw=true')
  }else{
  const next = $("body").find(".b-uploaded").attr("src")
  console.log(`next part ${next}`)
  const neurl = await axios.get(next)
  //console.log(neurl.data)
  $ = cheerio.load(neurl.data);
  const data = $('script').html()
  var d = data.split('play_url')[1]
  var t = d.split('"')[2]
  console.log(t)
  console.log('published')
  }
  
})()
