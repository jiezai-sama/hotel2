var express = require('express');
var router = express.Router();
const { Op } = require('sequelize')

const { Room,Dateprice,Area,Equipment,RoomImg,Rule,Owner,LandScape,Landscapewithroom,Title } = require('../mysql.js')
/* GET users listing. */
// 列表接口
router.get('/list', function(req, res, next) {
  // res.send('respond with a resource');
  console.log(req.query)
  let { 
  	minprice = 0,
  	maxprice =9999,
  	start,
  	end,
  	count,
  	city,
  	order = 'commentScore',
  	orderway = 'ASC',
  	eqid,
  	landid,
  	titleid,
  	limit = 10,
  	offset = 0,
  	keyword
  } = req.query
  // if (!start || !end || !city) {
  if (!city) {
  	res.json({msg:'参数错误'})
  	return
  }
  let condition = { 
  	lowerPrice: {
  		[Op.and]:{
  			[Op.lte]: maxprice,
	  		[Op.gte]: minprice
  		}
  	},
  	areaName: city
  };
  if (count) {
  	condition.guestNum = count
  }
	console.log(keyword)
  if (keyword) {
  	let key = {
  		[Op.or]: [
  			{
  				rName: {
  					[Op.like]: '%' + keyword + '%'
  				}
  			},{
  				traffic: {
  					[Op.like]: '%' + keyword + '%'
  				}
  			},{
  				loaction: {
  					[Op.like]: '%' + keyword + '%'
  				}
  			}
  		]
  	}
  	Object.assign(condition,key)
  	console.log(condition)
  }
  let include = []
  if(eqid){
  	let eqobj = {
  		model: Equipment,
  		where: {
  			[Op.and]:{
  				eid: eqid,
  				eHas: true
  			}
  		}
  	}
  	console.log(eqobj)
  	include.push(eqobj)
  }
  if(landid){
  	let eqobj = {
  		model: LandScape,
  		where: {
  			lid: landid
  		}
  	}
  	include.push(eqobj)
  }
  if(titleid){
  	let eqobj = {
  		model: Title,
  		where: {
  			tid: titleid
  		}
  	}
  	include.push(eqobj)
  }
  (async () => {
    let houses = await Room.findAll({
    	where: condition,
    	include: include,
    	order: [
    		[order,orderway]
    	],
    	limit: limit,
    	offset: offset
    })
    res.json(houses)
  })()
});

// 房屋详情接口 
router.get('/:rid', (req,res)=>{
	let rid = req.params.rid;
	(async () => {
		let house = await Room.findOne({
			where: {
				rid: rid
			},
			include:[
				{
					model: Title
				},{
					model: Owner
				},{
					model: RoomImg
				},{
					model: Equipment
				}
			]
		})
		if (!house) {
			res.json({msg:'查不到房源'})
			return
		}
		res.json(house)
	})()
})
// 房间日期接口
router.get('/price/:rid',(req,res)=>{
	let rid = req.params.rid;
	(async () =>{
		let prices = await Dateprice.findAll({
			where: {
				roomId: rid
			}
		});
		res.json(prices)
	})()
})

module.exports = router;
