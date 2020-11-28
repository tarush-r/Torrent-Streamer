var Q = require('q');
const http = require('http');
var peerflix = require('peerflix');
const express = require('express');
const request = require('request');
var cors = require('cors');

const mongoose = require('mongoose')
const databaseUrl = 'mongodb://127.0.0.1:27017/TorrentDB'


const AuthController = require("./controllers/AuthController")

var WebTorrent = require('webtorrent-hybrid')
var client = new WebTorrent()
var torrentFile = null;
var size = null

mongoose.connect(databaseUrl, {useNewUrlParser: true,useCreateIndex:true,
  useUnifiedTopology: true,
  useFindAndModify: false}).then(()=>{
    console.log("MongoDB connected successfully")
}).catch((err)=>{
    console.log("Error has occurred while connecting to the database: ",err);
})



const BASE_URL = "https://apibay.org/q.php?q="

const app = express();
app.use(express.json())

app.use(cors())

const uri = 'https://indiatpb.rocks/description.php?id=29814461';


app.post('/auth/register', AuthController.register)
app.post('/auth/login', AuthController.login)

app.get('/auth/username', AuthController.verifyToken, function(req, res, next){
  console.log("USER: "+req.decodedToken.name)
  return res.json(req.decodedToken.name);
})

app.get('/video/:magnetlink', (req, res) => {
  

  var magnetURI = "magnet:?xt=urn:btih:"+String(req.params.magnetlink)
  console.log(magnetURI)
  var start = null;
  var end = null;
  if (size != null) {
      console.log("SIZE IS NOPTNULL: UGIIUYKGLIYVIUYKVUYLHVLUYHV")
      const fileSize = size
      const range = req.headers.range
      const parts = range.replace(/bytes=/, "").split("-")
      start = parseInt(parts[0], 10)
      end = parts[1]
          ? parseInt(parts[1], 10)
          : size - 1
      const chunksize = (end - start) + 1
      const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
      }
      res.writeHead(206, head);
  }
  console.log("inside get")
  console.log("TORRENT IS " + torrentFile)
  if (torrentFile == null) {
      console.log("INSIDE IF")
      client.add(magnetURI, { path: './torrentfile' }, function (torrent) {
          console.log("READY")
          console.log("TORRENT FILES: " + torrent.files)
          torrent.files.forEach(function (file) {
              if (file.name.split('.').pop() == "mp4" || file.name.split('.').pop() == "mkv" || file.name.split('.').pop() == "avi") {
                  console.log("file NAMEEEEE: " + file.name)
                  console.log("inside on")
                  var fileName = file.name;
                  var filePath = file.path;
                  console.log(fileName + ' - ' + filePath);
                  const fileSize = file.length
                  size = fileSize
                  console.log("FILESIZE" + fileSize)

                  console.log("CORRECT FILE" + fileName)
                  torrentFile = file
                  // var fileSize = file.length;
                  const range = req.headers.range
                  const parts = range.replace(/bytes=/, "").split("-")
                  start = parseInt(parts[0], 10)
                  end = parts[1]
                      ? parseInt(parts[1], 10)
                      : fileSize - 1
                  const chunksize = (end - start) + 1
                  const head = {
                      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                      'Accept-Ranges': 'bytes',
                      'Content-Length': chunksize,
                      'Content-Type': 'video/mp4',
                  }
                  res.writeHead(206, head);
                  console.log("STREAMING FILE: " + torrentFile)
                  console.log("IF START END"+start+"  "+ end)
                  var stream = file.createReadStream(
                      {
                          start: start,
                          end: end
                      }

                  );

                  stream.pipe(res).on("open", function() {
                      stream.pipe(res);
                   }).on("data", function (data) {
                    // console.log(torrentFile.name);
                      // console.log(data);
                   }).on("error", function(err) {
                      res.end(err);
                   })

              }
          });
      });
  }
  else {
      console.log("INSIDE ELSE")
      console.log("ELSE START END"+start+"  "+ end)
      var stream = torrentFile.createReadStream(
          {
              start: start,
              end: end
          }


      ).on("open", function() {
          stream.pipe(res);
       }).on("data", function (data) {
        //  console.log(torrentFile.name);
          // console.log(data);
       }).on("error", function(err) {
          res.end(err);
       })

      stream.pipe(res)
  }
})


app.get('/magnet/:magnetlink', (req, res) => {
  torrentFile=null;
  size=null;
  client = new WebTorrent();
  magnetLink = req.params.magnetlink;
  engine = peerflix(magnetLink);
  console.log("ENGINE CREATED")

  engine.server.on('listening', function () {
    console.log("LISTENING")
    var myLink = 'http://localhost:' + engine.server.address().port + '/';
    console.log("LINK CREATED")
    console.log(myLink)
  });
})


app.get('/movieapi/:movie', (req, res) => {
  torrentFile=null;
  size=null;
  client = new WebTorrent();
  movie = req.params.movie;
  apiUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=ef6b212c&s=' + movie;
  console.log("URL:" + apiUrl)
  http.get(apiUrl, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      console.log(JSON.parse(data)['Search']);
      res.send(JSON.stringify(JSON.parse(data)['Search']))
    });
  })

})

app.get('/moviedetail/:id', (req, res) => {
  torrenFile=null;
  size=null;
  client = new WebTorrent();
  id = req.params.id;
  apiUrl = 'http://www.omdbapi.com/?apikey=ef6b212c&i=' + id;
  http.get(apiUrl, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data));
      res.send(JSON.stringify(JSON.parse(data)))
    });
  })

})

app.get('/:movie', (req, res) => {
  torrentFile=null;
  size=null;
  client = new WebTorrent();
  torrentCount = 0
  // console.log("INside GET")
  var count = 1
  var deferred = Q.defer();
  var data_content = {};
  var torrent_content = [];
  var search_url = BASE_URL + req.params.movie
  res.setHeader('Content-Type', 'application/json');
  request(search_url, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      data = JSON.parse(body)
      console.log("Dataaaaa" + data[0].info_hash)



      if (data[0].id) {
        for (var torrent in data) {
          torrentCount += 1
          if (torrentCount == 11) {
            break
          }
          var torrent_title = data[torrent].name;
          var seeds = data[torrent].seeders;
          var leechs = data[torrent].leechers;
          var size = bytesToSize(data[torrent].size);
          var torrent_link = data[torrent].info_hash;
          var date_added = "";
          //var date_added = data[torrent].added;

          data_content = {
            torrent_num: count,
            title: torrent_title,
            seeds: seeds,
            leechs: leechs,
            size: size,
            torrent_link: torrent_link,
            date_added: date_added
          };

          torrent_content.push(data_content);

          // deferred.resolve(torrent_content);

        }
        // console.log(torrent_content)
        res.send(JSON.stringify(torrent_content))

      }
    }
  })
});

function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + '' + sizes[i];
}

app.listen(3000)
