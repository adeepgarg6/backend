const express = require('express')
require('./db/mongoose')
const formidable = require('formidable')
const fs = require('fs')
const cors = require('cors');
const app = express()
const Course=require('./models/course')

app.use(express.json())
app.use(cors());

app.get('/api/products',async (req, res) => {
  var {date,length,provider,child,next,page}=req.query;
  var filter={}
  if(provider && provider!='undefined')
  { 
    console.log(provider.charCodeAt(0));
    if(provider.charCodeAt(0)>96)
     provider=String.fromCharCode(provider.charCodeAt(0)-32)+provider.substr(1,provider.length-1);
    filter['provider']={ $regex: provider }; console.log('dfgth') 
  }
  //{ $regex: provider }
  if(child && child!='undefined')
   filter['childSub']=child;
  if(next && next!='undefined')
   filter['nextSession']={ $regex: next };

   console.log(page);
   if((page=='undefined') || page<1)
    page=1;
   var sort={}
  if(length!=0 && length!='undefined')
   sort['length']='asc';
  if(date!=0 && date!='undefined')
  sort['nextSession']='desc';
  console.log(filter);
  console.log(sort);
  console.log(date+' '+length+' '+provider+' '+child+' '+next+' '+page);
  await Course.find(filter).limit(20).skip((page-1)*20).sort(sort).then((courses)=>{
    //console.log(courses[0])
    res.json(courses)
  }).catch((e)=>{
    res.send(e);
  })
});

app.post('/addData',async (req,res)=>{
  var result=[]
  var cc=[]
  await new formidable.IncomingForm().parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error', err)
      throw err
    }
    var address=files.csv.path
    fs.readFile(address, function (err, data) {
        neatCsv(data).then(async (data)=>{
            result=data
            console.log(result[0]['1'])
            for(var i=0;i<result.length;i++)
            {
              var x=result[i];
              const course=new Course({
                id:x['1'],
                name:x['2'],
                provider:x['3'],
                university:x['4'],
                parentSub:x['5'],
                childSub:x['6'],
                url:x['7'],
                nextSession:x['8'],
                length:x['9'],
                video:x['10']
              })
              
              cc.push(await course.save());
            }
            res.send(cc[0])
        })
      })
})
})

app.get('/',(req,res)=>{
    res.send('it is working');
})

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is up on port ' + 5000)
})

