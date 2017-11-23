# 轨迹处理服务的使用说明
### 1. 请求
#### (1) 说明

用于将GPS轨迹匹配到道路上，返回沿道路的路径，输入、输出数据为WGS84(EPSG:4326)的经纬度坐标。其中涉及的距离计算均采用Web Mecator投影坐标系(EPSG:3857)进行空间计算。

#### (2) 请求示例

##### python

```python
import requests
url = 'http://%(server)s:%(port)d/%(route)s' % {
    'server': '192.168.34.149',
    'port': 3000,
    'route': 'matching'
}
params = {
    'coordinates': '[[-8.636364,41.168709],[-8.635131,41.168232],[-8.634618,41.167215]]',
    'timestamp': '[1412065476, 1412065491, 1412065506]',
    'steps': 'true',
    'annotations': 'true',
    'geometries': 'geojson',
    'overview': 'full'
}      
res = requests.get(url, params=params)
```



#### (3) 参数

| 参数          | 值                                        | 说明             |
| ----------- | ---------------------------------------- | -------------- |
| steps       | `true` , `false` (default)               | 返回每条路径的行驶详情    |
| geometries  | `polyline` (default), `polyline6` , `geojson` | 返回匹配后的路径       |
| annotations | `true` , `false` (default), `nodes` , `distance` , `duration` ,`datasources` , `weight` , `speed` | 返回匹配路径上各路段的元数据 |
| overview    | `simplified` (default), `full` , `false` | 匹配路径是否简化       |
| timestamps  | `{timestamp};{timestamp}[;{timestamp} ...]` | 输入轨迹点的UNIX时间戳  |
| radiuses    | `{radius};{radius}[;{radius} ...]`       | GPS误差范围，默认为5m  |

### 2. 返回
#### (1) 返回格式说明
```json
/* 
	概念说明
	轨迹：匹配前的GPS坐标点序列
  	路径：匹配后并经过插值形成的沿道路行进的坐标点序列
  	路段：匹配后相邻轨迹点之间的道路段
*/
{
    "err": null,	// 匹配过程中是否出错
    "data": {	//匹配结果
        "matchings": [	// 匹配并插值后的路径
            {
                "confidence": 0.8471204286152522,	// 结果置信度
                "geometry": {	// 匹配并插值后的路径的几何信息
                    "coordinates": [	// [[lng,lat],...]
                        [
                            -8.636365,
                            41.16871
                        ],
                        [
                            -8.636179,
                            41.168811
                        ],
                        [
                            -8.636117,
                            41.168769
                        ],
                        [
                            -8.635654,
                            41.168528
                        ],
                        [
                            -8.635271,
                            41.168312
                        ],
                        [
                            -8.635173,
                            41.168228
                        ],
                        [
                            -8.63516,
                            41.168215
                        ],
                        [
                            -8.635066,
                            41.168123
                        ],
                        [
                            -8.635012,
                            41.168055
                        ],
                        [
                            -8.634962,
                            41.167984
                        ],
                        [
                            -8.63492,
                            41.167901
                        ],
                        [
                            -8.634667,
                            41.167205
                        ]
                    ],
                    "type": "LineString"
                },
                "legs": [	// 匹配后轨迹点之间的路段
                    {	// 单条路段的信息
                        "annotation": {	// 路段的元数据
                            "nodes": [	// 路段ID编号
                                1092997327,
                                335740663,
                                335739288,
                                4773399294,
                                335739286,
                                4773399293,
                                335739285
                            ],
                            "datasources": [
                                0,
                                0,
                                0,
                                0,
                                0,
                                0
                            ],
                            "weight": [	// 计算权重，默认是时间
                                1.7,
                                1,
                                6.8,
                                5.8,
                                1.8,
                                0.2
                            ],
                            "distance": [	// 路段因插值而分割成若干子路段，子路段的长度
                                19.202397456217394,
                                6.983623059749622,
                                47.13129595575306,
                                40.06940602048834,
                                12.434665924059908,
                                1.8098421746003308
                            ],
                            "duration": [	// 子路段的行驶时间
                                1.7,
                                1,
                                6.8,
                                5.8,
                                1.8,
                                0.2
                            ]
                        },
                        "summary": "Rua Airosa, Rua Central de Francos",	//	路段所在道路名称
                        "weight": 18,	// 路段权重
                        "duration": 18,	// 路段行驶时间
                        "steps": [	//	路段行驶过程的详情
                            {	// 子路段，子路段
                                "intersections": [	// 道路交叉口
                                    {
                                        "out": 0,
                                        "entry": [
                                            true
                                        ],
                                        "bearings": [
                                            54
                                        ],
                                        "location": [
                                            -8.636365,
                                            41.16871
                                        ]
                                    }
                                ],
                                "geometry": {	// 子路段节点
                                    "coordinates": [
                                        [
                                            -8.636365,
                                            41.16871
                                        ],
                                        [
                                            -8.636179,
                                            41.168811
                                        ]
                                    ],
                                    "type": "LineString"
                                },
                                "mode": "driving",
                                "maneuver": {	// 路径行为
                                    "bearing_after": 54,	
                                    "bearing_before": 0,
                                    "location": [
                                        -8.636365,
                                        41.16871
                                    ],
                                    "type": "depart"
                                },
                                "weight": 2.4,
                                "duration": 2.4,
                                "name": "Rua Airosa",
                                "distance": 19.2
                            },
                            {
                                "intersections": [
                                    {
                                        "out": 1,	//	转弯之后的方位角
                                        "in": 2,	//	转弯之前的方位角
                                        "entry": [	//	道路交叉口选择转弯的合法性
                                            true,
                                            true,
                                            false,
                                            true
                                        ],
                                        "bearings": [	// 道路交叉口可选的转弯方向，进入其他道路
                                            45,
                                            120,
                                            240,
                                            315
                                        ],
                                        "location": [	// 转弯口位置
                                            -8.636179,
                                            41.168811
                                        ]
                                    }
                                ],
                                "geometry": {
                                    "coordinates": [
                                        [
                                            -8.636179,
                                            41.168811
                                        ],
                                        [
                                            -8.636117,
                                            41.168769
                                        ],
                                        [
                                            -8.635654,
                                            41.168528
                                        ],
                                        [
                                            -8.635271,
                                            41.168312
                                        ],
                                        [
                                            -8.635173,
                                            41.168228
                                        ],
                                        [
                                            -8.63516,
                                            41.168215
                                        ]
                                    ],
                                    "type": "LineString"
                                },
                                "mode": "driving",
                                "maneuver": {	// 行动
                                    "bearing_after": 125,	//	采取行动前的方位角
                                    "bearing_before": 53,	//	采取行动后的方位角
                                    "location": [	//	采取行动位置
                                        -8.636179,
                                        41.168811
                                    ],
                                    "modifier": "right",	//	行动细节
                                    "type": "turn"	//	行动类型
                                },
                                "weight": 15.6,	//	子路段权重
                                "duration": 15.6,	//	子路段行驶时间
                                "name": "Rua Central de Francos",	//	路段所在道路名称
                                "distance": 108.4	//	子路段总长度
                            },
                            {
                                "intersections": [
                                    {
                                        "in": 0,
                                        "entry": [
                                            true
                                        ],
                                        "bearings": [
                                            323
                                        ],
                                        "location": [
                                            -8.63516,
                                            41.168215
                                        ]
                                    }
                                ],
                                "geometry": {
                                    "coordinates": [
                                        [
                                            -8.63516,
                                            41.168215
                                        ],
                                        [
                                            -8.63516,
                                            41.168215
                                        ]
                                    ],
                                    "type": "LineString"
                                },
                                "mode": "driving",
                                "maneuver": {
                                    "bearing_after": 0,
                                    "bearing_before": 143,
                                    "location": [
                                        -8.63516,
                                        41.168215
                                    ],
                                    "type": "arrive"
                                },
                                "weight": 0,
                                "duration": 0,
                                "name": "Rua Central de Francos",
                                "distance": 0
                            }
                        ],
                        "distance": 127.6
                    },
                    {
                        "annotation": {
                            "nodes": [
                                4773399293,
                                335739285,
                                4773399292,
                                4773399291,
                                2281015039,
                                335739282
                            ],
                            "datasources": [
                                0,
                                0,
                                0,
                                0,
                                0
                            ],
                            "weight": [
                                1.9,
                                1.3,
                                1.3,
                                1.4,
                                11.5
                            ],
                            "distance": [
                                12.90952359186783,
                                8.811790514667765,
                                8.938127433281677,
                                9.878892029776738,
                                80.25956224596337
                            ],
                            "duration": [
                                1.9,
                                1.3,
                                1.3,
                                1.4,
                                11.5
                            ]
                        },
                        "summary": "Rua Central de Francos",
                        "weight": 17.4,
                        "duration": 17.4,
                        "steps": [
                            {
                                "intersections": [
                                    {
                                        "out": 0,
                                        "entry": [
                                            true
                                        ],
                                        "bearings": [
                                            142
                                        ],
                                        "location": [
                                            -8.63516,
                                            41.168215
                                        ]
                                    }
                                ],
                                "geometry": {
                                    "coordinates": [
                                        [
                                            -8.63516,
                                            41.168215
                                        ],
                                        [
                                            -8.635066,
                                            41.168123
                                        ],
                                        [
                                            -8.635012,
                                            41.168055
                                        ],
                                        [
                                            -8.634962,
                                            41.167984
                                        ],
                                        [
                                            -8.63492,
                                            41.167901
                                        ],
                                        [
                                            -8.634667,
                                            41.167205
                                        ]
                                    ],
                                    "type": "LineString"
                                },
                                "mode": "driving",
                                "maneuver": {
                                    "bearing_after": 142,
                                    "bearing_before": 0,
                                    "location": [
                                        -8.63516,
                                        41.168215
                                    ],
                                    "type": "depart"
                                },
                                "weight": 17.4,
                                "duration": 17.4,
                                "name": "Rua Central de Francos",
                                "distance": 120.8
                            },
                            {
                                "intersections": [
                                    {
                                        "in": 0,
                                        "entry": [
                                            true
                                        ],
                                        "bearings": [
                                            345
                                        ],
                                        "location": [
                                            -8.634667,
                                            41.167205
                                        ]
                                    }
                                ],
                                "geometry": {
                                    "coordinates": [
                                        [
                                            -8.634667,
                                            41.167205
                                        ],
                                        [
                                            -8.634667,
                                            41.167205
                                        ]
                                    ],
                                    "type": "LineString"
                                },
                                "mode": "driving",
                                "maneuver": {
                                    "bearing_after": 0,
                                    "bearing_before": 165,
                                    "location": [
                                        -8.634667,
                                        41.167205
                                    ],
                                    "type": "arrive"
                                },
                                "weight": 0,
                                "duration": 0,
                                "name": "Rua Central de Francos",
                                "distance": 0
                            }
                        ],
                        "distance": 120.8
                    }
                ],
                "weight_name": "routability",
                "weight": 35.4,
                "duration": 35.4,
                "distance": 248.39999999999998
            }
        ],
        "tracepoints": [	// 匹配后的轨迹点
            {
                "alternatives_count": 0,	//	匹配候选点数量
                "waypoint_index": 0,	// 在轨迹序列中的序号
                "matchings_index": 0,	//	在路径序列中的序号
                "hint":	//	查询线索，用于后续轨迹的匹配 "UfIAANOvA4ARAAAAYAAAAAAAAAAAAAAAEQAAAGAAAAAAAAAAAAAAAPMDAAAzOHz_Ri90AjQ4fP9FL3QCAACvDgjZn2A=",
                "name": "Rua Airosa",	//	所在道路的名称
                "location": [	//	匹配后轨迹点的坐标
                    -8.636365,
                    41.16871
                ]
            },
            {
                "alternatives_count": 0,
                "waypoint_index": 1,
                "matchings_index": 0,
                "hint": "TvIAgP___38CAAAAFQAAAJoAAACqAAAAAgAAABUAAACaAAAAqgAAAPMDAADoPHz_Vy10AgU9fP9oLXQCBADvCAjZn2A=",
                "name": "Rua Central de Francos",
                "location": [
                    -8.63516,
                    41.168215
                ]
            },
            {
                "alternatives_count": 5,
                "waypoint_index": 2,
                "matchings_index": 0,
                "hint": "TvIAgP___39zAAAAggAAANcAAAAAAAAAcwAAAIIAAADXAAAAAAAAAPMDAADVPnz_ZSl0AgY_fP9vKXQCCABPCgjZn2A=",
                "name": "Rua Central de Francos",
                "location": [
                    -8.634667,
                    41.167205
                ]
            }
        ]
    }
}
```



