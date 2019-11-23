<template>
  <div class="oriention">
    <el-row>
      <div class="el-col el-col-24 el-col-xs-6 el-col-md-6 el-col-lg-6">
        <div class="navigationMenu" style="background-color: #FFFFFF;">
          <div style="width: 100%;height: 35px;background-color: #409EFF;border-radius: 5px;text-align: center;line-height: 35px;">
            <font style="color: white;">查询条件</font>
          </div>
          <div class="mapCondition" style="padding: 15px;">
            <div style="margin-bottom: 10px;">
              <el-select v-model="formLabelAlign.district" placeholder="请选择区域 " size="small" style="width: 145px;">
                <el-option label="---请选择区域---" value=""></el-option>
                <el-option :label="item.name" :value="item.id" v-for="(item,index) in this.districts" :key="item.id"></el-option>
              </el-select>
              <el-select v-model="formLabelAlign.level" placeholder="请选择水质等级 " size="small" style="width: 140px;">
                <el-option label="---请选择水质---" value=""></el-option>
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
              </el-select>
            </div>
            <div>
              <el-select v-model="formLabelAlign.responsible" placeholder="请选择负责人 " size="small" style="width: 185px;">
                <el-option label="---请选择负责人---" value=""></el-option>
                <el-option :label="item.name" :value="item.uid" v-for="(item,index) in this.responsible" :key="item.uid"></el-option>
              </el-select>
              <el-button type="primary" size="small" style="width: 100px;" @click="onSubmit" icon="el-icon-search">查询</el-button>
            </div>
          </div>
          <div style="width: 100%;height: 35px;background-color: #409EFF;border-radius: 5px;text-align: center;line-height: 35px;">
            <font style="color: white;">查询结果:共{{mapDataLen}}条记录</font>
          </div>
          <div class="mapResult">
            <div class="resultDiv" v-for="(item,index) in mapData" :key="item.id" @click="panTo(item.longtitude,item.latitude,$event)">
              <div style="padding-left: 10px;padding-top: 5px;">
                <font color="#1a8bff">{{item.name}}</font>
              </div>
              <div style="display: flex;justify-content: space-between;padding: 10px;">
                <span>上周水质等级:{{item.prelevel}}</span>
                <span>当前水质等级:{{item.currlevel}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 结果区域-->
      <div class="el-col el-col-24 el-col-xs-18 el-col-md-18 el-col-lg-18">
        <div class="map-container">
          <div id="map" ref="mapForStation" class="map"></div>
        </div>
      </div>
    </el-row>

    <div style="display: none;">
      <div v-for="(item,index) in mapData" :key="item.id" style="width: 300px;text-align: center;" ref="card">
        <ul class="list-group">
          <li class="list-group-item active">{{item.name}}</li>
          <!--<li class="list-group-item">站点编号：{{item.id}}</li>-->
          <li class="list-group-item">当前水质等级：{{item.currlevel}}</li>
          <li class="list-group-item">上周水质等级：{{item.prelevel}}</li>
          <li class="list-group-item">负责人: {{item.userinfo.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  // import BMap from 'BMap'
  export default {
    data() {
      return {
        mapData: '',
        latitude: [],
        longtitude: [],
        currLevel: [],
        title: [],
        markPoint: [],
        infoWindow: [],
        tableData: [],
        formLabelAlign: {
          district: '',
          responsible: '',
          level: ''
        },
        responsible: [],
        districts: [],
        isInit: true,
        mapDataLen:0

      }
    },
    mounted() {
      this.initData()
      this.initMap()

    },
    updated() {
      map.clearOverlays()
      this.updateInfo()

    },
    inject: ['reload'],
    methods: {
      initData() {
        this.$store.dispatch('datar/getStationForMap', this.formLabelAlign).then(response => {
          this.mapData = response
          this.tableData = response
          this.mapDataLen = response.length
          let latitude = []
          let longtitude = []
          let currLevel = []
          let title = []
          let responsible = []
          let districts = []
          for(let i = 0; i < response.length; i++) {
            latitude.push(response[i].latitude)
            longtitude.push(response[i].longtitude)
            currLevel.push(response[i].currlevel)
            title.push(response[i].name)

          }

          this.latitude = latitude
          this.longtitude = longtitude
          this.title = title
          this.currLevel = currLevel
          if(this.isInit) {
            for(let i = 0; i < response.length; i++) {
              responsible.push(response[i].userinfo)
              districts.push(response[i].district)
            }

            this.responsible = this.unique(responsible)
            this.districts = this.unique(districts)
            this.isInit = false

          }

        })
      },
      markerFun(point, label, infoWindows) {
        let marker = new BMap.Marker(point)
        map.addOverlay(marker)
        marker.setLabel(label)
        marker.addEventListener("click", function(event) {
          map.openInfoWindow(infoWindows, point)
        })
      },
      updateInfo() {
        //      alert(111)
        let cards = this.$refs.card
        cards.forEach((item, index) => {
          this.infoWindow.push(item)
        })
        let markPoint = []
        for(let i = 0; i < this.mapData.length; i++) {
          markPoint.push({
            y: this.longtitude[i],
            x: this.latitude[i],
            title: this.title[i],
            currLevel: this.currLevel[i],
            content: this.infoWindow[i]
          })
        }
        this.markPoint = markPoint

        for(let i = 0; i < this.markPoint.length; i++) {
          let point = new BMap.Point(this.markPoint[i].y, this.markPoint[i].x)
          let label = new BMap.Label(this.markPoint[i].title)
          let info = new BMap.InfoWindow(this.markPoint[i].content, {
            width: 300,
            height: 200
          })

          this.markerFun(point, label, info)
        }

      },
      initMap() {
        let map = new BMap.Map(this.$refs.mapForStation)
        let point = new BMap.Point(118.7809, 32.040619);
        map.enableScrollWheelZoom(true);
        map.centerAndZoom(point, 12)
        map.setCurrentCity("南京")
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.GeolocationControl());
        map.addControl(new BMap.OverviewMapControl());
        map.addControl(new BMap.MapTypeControl());
        //      var marker = new BMap.Marker(point);
        //      map.addOverlay(marker)
        window.map = map
      },
      unique(array) {
        return Array.from(new Set(array.sort()))
      },
      onSubmit() {
        this.initData()
      },
      panTo(longtitude,latitude,event){
        let resultDivs = document.getElementsByClassName("resultDiv")
        for(let i=0;i<resultDivs.length;i++){
          resultDivs[i].classList.remove('activeDiv')
        }
        event.currentTarget.classList.add('activeDiv')
        map.panTo(new BMap.Point(longtitude,latitude))
//      alert(event)
      }
    }
  }
</script>

<style>
  .navigationMenu {
    position: relative;
    /*width: 280px;*/
   width: 100%;
    /*height: 600px;*/
    height: 80%;
    box-shadow: 2px 2px 5px #333333;
    border-radius: 5px;
  }
  
  .map {
    position: relative;
    width: 100%;
    height: 600px;
  }
  
  .map-container {
    height: 100%;
  }
  
  .oriention {
    width: 100%;
  }
  
  .activeDiv{
    background-color: #e8e8ff;
  }
  
  .mapResult{
    width: 100%;
    height:425px;
    overflow: auto;
  }
  
  .resultDiv{
    width: 100%;
    height: 70px;
    border-bottom:1px solid #BCBEC2;
    cursor: pointer;
  }
</style>