<template>
    <div>
        <div class="device_mun" style="display: none;">
            <div>
                <span class="title_icon"></span>
                <span class="title">设备数量统计</span>
            </div>
            <div>
                <div class="info line">
                    <span>总数</span><br />
                    <span>8476</span>
                </div>
                <div class="info line">
                    <span>停用</span><br />
                    <span class="font_white">842</span>
                </div>
            </div>
            <div>
                <div class="info line">
                    <span>关注</span><br />
                    <span>8406</span>
                </div>
                <div class="info line">
                    <span>报警</span><br />
                    <span class="font_green">10</span>
                </div>
            </div>
            <div class="info">
                <span>在线</span><br />
                <span>8429</span>
            </div>
            <div class="info">
                <span>离线</span><br />
                <span>503</span>
            </div>
        </div>
        <div class="device_status" style="display: none;">
            <div>
                <span class="icon blue"></span>
                <span class="status">安装设备</span>
            </div>
            <div>
                <span class="icon null"></span>
                <span class="status">未安装设备</span>
            </div>
            <div>
                <span class="icon green"></span>
                <span class="status">设备故障</span>
            </div>
            <div>
                <span class="icon red"></span>
                <span class="status">指标超标</span>
            </div>
        </div>
        <div ref="myChart" id="myChart" style="width: 100%; height: 780px;"></div>
    </div>
</template>

<script>
export default {
    name: "chinaMap",
    data() {
        return {};
    },
    methods: {},
    mounted() {
        var geoCoordMap = {
            射阳县: [120.247444, 33.673779],
            射阳县1: [120.287444, 33.873779],
            阜宁县: [119.705338, 33.78573],
            盐都区: [119.939753, 33.261288],
        };
        function convertData(data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value),
                    });
                }
            }
            return res;
        }
        let myChart = this.$echarts.init(document.getElementById("myChart"));
        this.$axios.get("../../../static/map/jiangsu/yancheng.json").then((geoJson) => {
            this.$echarts.registerMap(geoJson.data.name, geoJson.data);
            let option = {
                backgroundColor: "#00343C",
                visualMap: {
                    min: 800,
                    max: 1000,
                    show: false,
                    calculable: false,
                    inRange: {
                        color: ["#83fe05", " #008781", "#fe3d33"],
                    },
                },
                geo: {
                    map: geoJson.data.name,
                    // mapType: geoJson.data.name, // 自定义扩展图表类型
                    // aspectScale: 1, //保持原始比例
                    roam: true, // 拖拽移动
                    // type: 'map',
                    label: {
                        normal: {
                            show: false,
                            textStyle: {
                                fontSize: 15,
                            },
                        },
                        emphasis: {
                            show: true,

                            color: "#2e403f",
                        },
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 1,
                            areaColor: "#003a3b",
                            borderColor: "#00ced0",
                        },
                        //鼠标事件区块样式
                        emphasis: {
                            areaColor: "#00aca2",
                        },
                    },
                },
                series: [
                    {
                        type: "effectScatter",
                        coordinateSystem: "geo",
                        data: convertData([
                            { name: "射阳县", value: 1000 },
                            { name: "射阳县1", value: 800 },
                            { name: "阜宁县", value: 800 },
                            { name: "盐都区", value: 800 },
                        ]),
                        symbolSize: "15",
                        itemStyle: {
                            color: "purple",
                            shadowBlur: 10,
                            shadowColor: "#333",
                        },
                    },
                    {
                        name: "categoryA",
                        type: "map",
                        geoIndex: 0,
                        data: [
                            { name: "射阳县", value: 900 },
                            { name: "阜宁县", value: 900 },
                            { name: "盐都区", value: 900 },
                        ],
                    },
                ],
            };
            myChart.setOption(option);
        });
    },
};
</script>

<style lang="scss" scoped>
.device_mun {
    position: fixed;
    z-index: 9999;
    .title_icon {
        display: inline-block;
        border-left: #00beb5 solid 6px;
        border-right: #00beb5 solid 6px;
        border-top: #00d0d1 solid 6px;
        border-bottom: #00d0d1 solid 6px;
        border-radius: 50%;
        line-height: 30px;
        height: 18px;
        width: 18px;
        vertical-align: middle;
    }
    .title {
        margin-left: 10px;
        font-size: 26px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #fbfbfb;
        line-height: 39px;
        vertical-align: middle;
    }
    .info {
        margin: 30px 0 0 40px;

        span {
            font-size: 20px;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #cccccc;
            line-height: 30px;
        }
        span:last-child {
            font-size: 36px;
            font-family: Helvetica;
            color: #00d0d1;
            line-height: 43px;
        }
        .font_white {
            color: white !important;
        }
        .font_green {
            color: #84ff00 !important;
        }
    }
    .line {
        width: 90px;
        display: inline-block;
    }
}
.device_status {
    position: fixed;
    z-index: 9999;
    right: 50px;
    .status {
        font-size: 17px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #cccccc;
        line-height: 24px;
        margin-left: 10px;
        vertical-align: middle;
    }
    .icon {
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        vertical-align: middle;
    }
    .blue {
        background: #00beb5;
        border: 1px solid #000000;
    }
    .null {
        background: #003a3b;
        border: 1px solid #00d0d1;
    }
    .green {
        background: #84ff00;
    }
    .red {
        background: #ff3e37;
    }
}
</style>
