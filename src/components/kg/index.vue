<template>
  <div class="kgContainer">
    <div class="alert alert-info" role="alert" style="margin-bottom: 20px;">
      <h1>The Knowledge Graph Of Water Quality</h1>
      <!--<h4></h4>-->
      <font size="4"><font size="5"><strong>Prompt:</strong></font>添加关系格式如:张三-爱慕->李四</font>
      
    </div>
    <div class="search" style="text-align: center;margin-bottom: 30px;">
      <el-input v-model="entityName" placeholder="请输入内容" style="width: 400px;"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="initData">搜索</el-button>
    </div >
    <div class="add" style="text-align: center;margin-bottom: 30px;">
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
    </div>
    <div class="kgShow" id="kgShow" style="width: 100%;">

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
      initData() {
        this.$store.dispatch('kg/search', this.entityName).then(response => {
          const nodes = response.nodes
          const relationship = response.relationships
          const nodesList = []
          for(let i = 0; i < nodes.length; i++) {
            const tmp = {
              name: nodes[i],
              symbolSize: 50,
              itemStyle: {
                normal: {
                  //                color: {
                  //                   type: 'linear',
                  //                      x: 0,
                  //                      y: 0,
                  //                      x2: 0,
                  //                      y2: 1,
                  //                      colorStops: [{
                  //                          offset: 0, color: 'red' // 0% 处的颜色
                  //                      }, {
                  //                          offset: 1, color: 'blue' // 100% 处的颜色
                  //                      }],
                  //                      global: false // 缺省为 false
                  //                },
                  show: true,
                }
              }
            }
            nodesList.push(tmp)
          }

          const links = []
          for(let i = 0; i < relationship.length; i++) {
            const relationshipArray = relationship[i].split("-")
            const tmp = {
              source: relationshipArray[0],
              target: relationshipArray[2],
              name: relationshipArray[1]
            }
            links.push(tmp)
          }

          const option = {
            title: {
              text: '水质知识图谱'
            },
            tooltip: {
              formatter: function(x) {
                return x.data.name;
              }
            },
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [{
              type: 'graph',
              layout: 'force',
              symbolSize: 80,
              roam: true,
              label: {
                normal: {
                  show: true,
                }
              },
              edgeSymbol: ['circle', 'arrow'],
              edgeSymbolSize: [4, 10],
              edgeLabel: {
                normal: {
                  textStyle: {
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
                  color: '#4b565b',
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
              data: nodesList,
              links: links
            }]
          }
          this.option = option

          this.showKg()
        })
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
      getInfo(params) {
        alert(params)
      },
      showKg() {
        const kgShow = document.getElementById('kgShow')
        const myChart = echarts.init(kgShow, 'light')
        myChart.setOption(this.option)

        let data = myChart._model.option.series[0].data;
        myChart.on("click", (chartParam) => {
          //        console.log(myChart._model)
          //        console.log(chartParam)
          const entityName = data[chartParam.dataIndex].name
          this.entityName = entityName
          this.initData()
        });

        myChart.on("mouseover", (chartParam) => {
          console.log(chartParam)
        })

      },
      //    tst() {
      //      const option2 = {
      //        title: {
      //          text: 'Graph 简单示例'
      //        },
      //        tooltip: {},
      //        animationDurationUpdate: 1500,
      //        animationEasingUpdate: 'quinticInOut',
      //        series: [{
      //          type: 'graph',
      //          layout: 'none',
      //          symbolSize: 50,
      //          roam: true,
      //          label: {
      //            normal: {
      //              show: true
      //            }
      //          },
      //          edgeSymbol: ['circle', 'arrow'],
      //          edgeSymbolSize: [4, 10],
      //          edgeLabel: {
      //            normal: {
      //              textStyle: {
      //                fontSize: 20
      //              }
      //            }
      //          },
      //          data: [{
      //            name: '节点1',
      //            x: 300,
      //            y: 300
      //          }, {
      //            name: '节点2',
      //            x: 800,
      //            y: 300
      //          }, {
      //            name: '节点3',
      //            x: 550,
      //            y: 100
      //          }, {
      //            name: '节点4',
      //            x: 550,
      //            y: 500
      //          }],
      //          // links: [],
      //          links: [{
      //            source: 0,
      //            target: 1,
      //            symbolSize: [5, 20],
      //            label: {
      //              normal: {
      //                show: true
      //              }
      //            },
      //            lineStyle: {
      //              normal: {
      //                width: 5,
      //                curveness: 0.2
      //              }
      //            }
      //          }, {
      //            source: '节点2',
      //            target: '节点1',
      //            label: {
      //              normal: {
      //                show: true
      //              }
      //            },
      //            lineStyle: {
      //              normal: {
      //                curveness: 0.2
      //              }
      //            }
      //          }, {
      //            source: '节点1',
      //            target: '节点3'
      //          }, {
      //            source: '节点2',
      //            target: '节点3'
      //          }, {
      //            source: '节点2',
      //            target: '节点4'
      //          }, {
      //            source: '节点1',
      //            target: '节点4'
      //          }],
      //          lineStyle: {
      //            normal: {
      //              opacity: 0.9,
      //              width: 2,
      //              curveness: 0
      //            }
      //          }
      //        }]
      //      }
      //      
      //      const chart2 = echarts.init(document.getElementById('tst'))
      //      chart2.setOption(option2)
      //
      //    }
    }
  }
</script>

<style>
  .kgContainer {
    width: 100%;
    background-color: #FFFFFF;
    padding: 32px;
  }
  
  .kgShow {
    width: 100%;
    height: 500px;
  }
</style>