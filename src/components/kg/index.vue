<template>
  <div class="kgContainer">
    <!--<div class="alert alert-info" role="alert" style="margin-bottom: 20px;">
      <h1>The Knowledge Graph Of Water Quality</h1>
      <font size="4"><font size="5"><strong>Prompt:</strong></font>添加关系格式如:张三-爱慕->李四</font>
      
    </div>-->
    <div class="search" style="text-align: center;margin-bottom: 10px;padding-top: 32px; ">
      <el-input v-model="entityName" placeholder="请输入内容" style="width: 400px;"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="initData">搜索</el-button>
    </div>
    <!--<div class="add" style="text-align: center;margin-bottom: 30px;">
      初始节点：   <el-input v-model="form.entityFrom" placeholder="请输入内容" style="width: 100px;"></el-input>
      <el-select v-model="form.startLabel" placeholder="请选择开始节点类型">
        <el-option label="站点" value="Station">
        </el-option>
        <el-option label="区域" value="District">
        </el-option>
        <el-option label="常识" value="Knowledge">
        </el-option>
      </el-select>
      关系：<el-input v-model="form.relation" placeholder="请输入内容" style="width: 100px;"></el-input>
      终止节点：<el-input v-model="form.entityTo" placeholder="请输入内容" style="width: 100px;"></el-input>
      <el-select v-model="form.endLabel" placeholder="请选择终止节点类型">
        <el-option label="站点" value="Station">
        </el-option>
        <el-option label="区域" value="District">
        </el-option>
        <el-option label="常识" value="Knowledge">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="add">添加</el-button>
    </div>-->
    <div class="kgShow" id="kgShow" style="width: 100%;height: 800px;">

    </div>

    <!--<div class="test" id="tst" style="width: 100%;height: 500px;"></div>-->
  </div>
</template>

<script>
  var echarts = require('echarts');
  export default {
    data() {
      return {
        entityName: '',
        option: '',
        form: {
          entityFrom: '',
          startLabel: '',
          relation: '',
          entityTo: '',
          endLabel: ''
        },
        nodes: [],
        relationships: [],

      }
    },
    mounted() {
      this.initData()
      //    this.tst()
    },
    inject: ['reload'],
    methods: {
      ellipsis(sentence){
        if(sentence.length > 10){
          sentence = sentence.substring(0,10)+"..."
        }
        return sentence
      },
      initData() {
        const temp = this.entityName.split('@')
        const infos = {
          'entityName':temp[0],
          'entityId': temp[1]
        }
        
        this.$store.dispatch('kg/search2', infos).then(response => {
          const data = response.obj
          //        const nodes = response.nodes
          //        const relationship = response.relationships
          //        const nodesList = []
          const nodesList = new Set()
          for(let i = 0; i < data.length; i++) {
            const node_name1 = this.eliminateEli(data[i].entity) + '@' + data[i].entityId
            const entityAmbiguous = this.eliminateEli(data[i].entityAmbiguous)
            const node_name2 = this.eliminateEli(data[i].value) + '@' + data[i].valueId
            const valueAmbiguous = this.eliminateEli(data[i].valueAmbiguous)
            nodesList.add(node_name1)
            nodesList.add(node_name2,valueAmbiguous)
          }
          
          
          const nodesConfig = []
          nodesList.forEach((e, i) => {
//          alert(JSON.stringify(e))
            const tmp = {
              name: e,
//            ambiguous: e[1],
              symbolSize: 50,
              itemStyle: {
                normal: {
                  color: this.generate_color(),
                  show: true,
                }
              }
            }
            nodesConfig.push(tmp)
          })

          const links = []
          for(let i = 0; i < data.length; i++) {
            const tmp = {
              source: this.eliminateEli(data[i].entity)+'@'+data[i].entityId,
              target: this.eliminateEli(data[i].value)+'@'+data[i].valueId,
              name: this.eliminateEli(data[i].relation)
            }
            links.push(tmp)
          }

          const option = {
            //          title: {
            //            text: '水质知识图谱',
            //            textStyle: {
            //              color: '#fff'
            //            }
            //          },
            //设置鼠标移动到节点处显示的信息
            tooltip: {
              formatter: function(x) {
                return x.data.name;
              }
            },
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [{
              type: 'graph',
              layout: 'circular',
//            layout: 'force',
              symbolSize: 80,
              roam: true,
              label: {
                normal: {
                  show: true,
                  color: 'black'
                }
              },
              edgeSymbol: ['circle', 'arrow'],
              edgeSymbolSize: [4, 10],
              edgeLabel: {
                normal: {
                  textStyle: {
                    //                  color: '#fff',  
                    fontSize: 20
                  }
                }
              },
              force: {
                repulsion: 3000, //斥力
                edgeLength: [20, 80] //默认距离
              },
              //            layout:'circular',
              draggable: true,
              lineStyle: {
                normal: {
                  width: 2,
                  color: 'black',
                  curveness: 0.2,
                  length: 20
                }
              },
              edgeLabel: {
                normal: {
                  show: true,
                  formatter: function(x) {
                    return x.data.name;
                  }
                }
              },
              data: nodesConfig,
              links: links
            }]
          }
          this.option = option

          this.showKg()
        })
      },
      eliminateEli(x) {
        //      alert(x)
        x = x.replace(/\"/g, '')
        return x
      },
      add() {
        this.$store.dispatch('kg/save', this.form).then(response => {
          if(response.status == 200) {
            this.$message({
              message: response.msg,
              type: 'success'
            })

            this.reload()
          }
        })
      },
      getInfo(params) {},
      generate_random_color() {
        let r = this.generate_fix_random(50, 200)
        let g = this.generate_fix_random(50, 200)
        let b = this.generate_fix_random(50, 200)
        let color = r.toString(16) + g.toString(16) + b.toString(16)

        return color
      },
      generate_color() {
        let regx = /[^FEfe]/
        let color = this.generate_random_color()
        if(regx.test(color)) {
          color = this.generate_random_color()
        }
        return '#' + color
      },
      generate_fix_random(n, m) {
        let x = Math.floor(Math.random() * (m - n + 1)) + n
        return x
      },
      showKg() {
        const kgShow = document.getElementById('kgShow')
        const myChart = echarts.init(kgShow, 'light')
        myChart.setOption(this.option)

        let data = myChart._model.option.series[0].data;
        myChart.on("click", (chartParam) => {
          //        console.log(myChart._model)
//                  console.log(chartParam)
          const temp = data[chartParam.dataIndex].name
//        const entityName = temp[0]
          this.entityName = temp
          this.initData()
        });

        myChart.on("mouseover", (chartParam) => {
          console.log(chartParam)
        })
      }
    }
  }
</script>

<style scoped>
  .kgContainer {
    width: 100%;
    /*0b2838*/
    background-color: #fff;
    /*padding: 32px;*/
  }
  
  .kgShow {
    width: 100%;
    height: 500px;
    /*background-color: #0b2838;*/
  }
</style>