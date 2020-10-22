<template>
  <div class="chat" :class="{scroll: display}">
		<div class="msg-box clear">
			<div class="msg-item" v-for="(item,i) in msglist" :key="i" :class="item.type">
				<div class="msg-avator-box">
					<img src="~assets/img/fire.png">
				</div>
				<div class="msg-info">
					<div class="msg-user-name">LLLfbl</div>
					<div class="msg-content" v-html="item.msg"></div>
				</div>
			</div>
		</div>
		<div>
			<biaoqing @send="send" :value="message" @showchange="(show) => display=show"></biaoqing>
			<!-- <input type="text" v-model="message"> -->
		</div>
  </div>
</template>

<script>
import biaoqing from 'components/biaoqing/biaoqing.vue'
export default {
  name: 'Chat',
  components: {
		biaoqing
  },
	data(){
		return {
			uid:Math.ceil(Math.random() * 10),
			message:'',
			display:false,
			msglist:[{
				msg:'<img style="vertical-align: sub;" src="http://tkeasyemoji.oss-cn-shanghai.aliyuncs.com/images/placeholder.png" class="bg-1f60d" alt="😍"><img style="vertical-align: sub;" src="http://tkeasyemoji.oss-cn-shanghai.aliyuncs.com/images/placeholder.png" class="bg-1f60d" alt="😍">房子咋卖',
				type:'me'
			},{
				msg:'不卖了',
				type:'owner'
			},{
				msg:'<img style="vertical-align: sub;" src="http://tkeasyemoji.oss-cn-shanghai.aliyuncs.com/images/placeholder.png" class="bg-1f60d" alt="😍"><img style="vertical-align: sub;" src="http://tkeasyemoji.oss-cn-shanghai.aliyuncs.com/images/placeholder.png" class="bg-1f60d" alt="😍">',
				type:'me'
			}],
		}
	},
	mounted() {
		// this.$socket.emit('connection',this.uid);
	},
	sockets:{
		connect(){
			this.$socket.emit('connection',this.uid);
		},
		costom(data){
			console.log(data)
		},
		chat(data){
			this.msglist.push(data)
			this.message = ' ';
		}
	},
	methods:{
		send(content){
			this.message = content;
			if(content.replace(/\s/g,'').length <= 0){
				this.$toast('您还没写内容呢')
				return
			}
			this.msglist.push({msg:this.message,type:'me'});
			this.$socket.emit('chat',this.message)
		}
	}
}
</script>

<style lang="less" scoped>
	.chat{
		padding: 1.2rem .4rem 1.466667rem;
		box-sizing: border-box;
		overflow: scroll;
	}
	.scroll{
		height: 12.5rem;
	}
	.msg-box{
		background: #f5f5f5;
		.msg-item{
			// width: 100%;
			clear: both;
			max-width: 8rem;
			padding: .4rem 0;
		}
	}
	.msg-avator-box {
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		margin: 0 .3rem;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.msg-box{
		.msg-info{
			max-width: 6.3rem;
		}
		.msg-content{
			padding: .3rem;
			border-radius: .2rem;
		}
		.me{
			float: right;
			.msg-avator-box,.msg-info{
				float: right;
			};
			.msg-user-name{
				text-align: right;
			};
			.msg-content{
				background: #ff4081;
				color: #fff;
			}
		}
		.owner{
			float: left;
			.msg-avator-box,.msg-info{
				float: left;
			};
			.msg-user-name{
				text-align: left;
			};
			.msg-content{
				background: #fff;
			}
		}
	}

</style>
