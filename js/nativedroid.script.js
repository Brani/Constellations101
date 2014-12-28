$(document).on("pageinit",function() {
	
	function strip_tags(input, allowed) {
	 allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
	  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
	    commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
	  return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
	    return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
	  });
	}
	
	// Obj
	
	nativeDroid = {
		basic : {
			dateFormat : {
				format : function(dateStr) {
					var newtext = dateStr.replace(/(\+\S+) (.*)/, '$2 $1')	
					var date = new Date(Date.parse(dateStr)).toLocaleDateString();
					var time = new Date(Date.parse(dateStr)).toLocaleTimeString();
					return date +' @ ' + time;
				}
			}
		},
		design : {
			animation : {
				delayedFadeIn : function() {
					obj = $(".delayedFadeIn");
					if(obj) {
						if(obj.length > 0) {
							delay = 2750;
							setTimeout(function() {
								$(".delayedFadeIn:last").fadeIn(1000).removeClass('delayedFadeIn');
								nativeDroid.design.animation.delayedFadeIn();
							},delay);
						}
					}
				}
			},
			progress : {
				loaded : false,
				ini : function() {
					$("body").prepend("<progress id='nativeDroidProgress' data-animation-time='5' value='0' max='100' class='nativeDroidProgress'></progress>");
					$(".ui-header").addClass("noborder");
					$(".nativeDroidProgress").attr("data-animation-time",0).attr("value",0);
					setTimeout(function() {
						nativeDroid.design.progress.createCSS($("body").data("nativedroid-progress-animation"));
						$(".nativeDroidProgress").attr("data-animation-time",5).attr("value",100);
					},300);
				},
				update : function(time) {
					roundedTime = (time % 5) >= 2.5 ? parseInt(time / 5) * 5 + 5 : parseInt(time / 5) * 5;
					nativeDroid.design.progress.createCSS(0);
					$(".nativeDroidProgress").attr("data-animation-time",0).attr("value",0);
					setTimeout(function() {
						$(".nativeDroidProgress").attr("data-animation-time",roundedTime);
						nativeDroid.design.progress.createCSS($(".nativeDroidProgress").attr("data-animation-time"));
						$(".nativeDroidProgress").attr("value",100);
					},300);
				},
				blink : function() {
					$(".nativeDroidProgress").fadeTo(500,0.5,function() {
						$(".nativeDroidProgress").fadeTo(500,1);
					});
				},
				createCSS : function(time) {
				    s = '.nativeDroidProgress::-webkit-progress-value { -webkit-transition: all ' + time + 's !important; }';
				    s += '.nativeDroidProgress::-moz-progress-bar { -moz-transition: all ' + time + 's !important; }';
					$("#progressLoadeStyle").remove();
					$("<style type='text/css' id='progressLoaderStyle'> "+s+" </style>").appendTo("head");
				}
			}
		},
		plugins : {
			cards : {
				ini : function(obj) {
					obj.addClass("nativeDroidCards");
					obj.find(" > li").each(function() {
						type = $(this).attr('data-cards-type');
						nativeDroid.plugins.cards.create[type]($(this));
					});
				},
				create : {
					text : function(obj) {
						console.log("text");
					},
					traffic : function(obj) {
						route = obj.data("cards-traffic-route");
						obj.find(".map").html("Display a route-map here [from: "+route.from+", to: "+route.to+"]");
					},
					weather : function(obj) {
						console.log("weather");
					},
					publictransport : function(obj) {
						console.log("publictransport");
					},
					sports : function(obj) {
						console.log("sports");
					}		
				}
			},
			twitter : {
				container : false,
				results : {
					count : 0,
					rpmin : 0,
					first : 0,
					last : 0,
					pendingResults : [],
					update : function(count) {

						nativeDroid.plugins.twitter.results.count += count;
						lastResult = new Date().getTime() / 1000;

						firstResult = nativeDroid.plugins.twitter.results.first;
						nativeDroid.plugins.twitter.results.first = (firstResult == 0) ? nativeDroid.plugins.twitter.results.last : firstResult;
						nativeDroid.plugins.twitter.results.last = lastResult;

						// Calc RPM
						results = nativeDroid.plugins.twitter.results.count;
						rpm = Math.round(results / ((lastResult - firstResult) / 60));						
						nativeDroid.plugins.twitter.results.rpmin = rpm;
						
						// Update Refresh Timer
						qd = nativeDroid.plugins.twitter.request.queryData;
						rpp = (qd.rpp) ? parseInt(qd.rpp) : 15;
						if(rpm > 0.5) {
							ad = ((rpp*0.8) / rpm) * 60000;
							if(ad > 10000 && ad < 120000) {
								nativeDroid.plugins.twitter.refresh.time = ad;
							}
						}
					}					
				},
				refresh : {
					url : false,
					time : false,
					auto_delay : 45000,
					load : function() {
						nativeDroid.design.progress.update(nativeDroid.plugins.twitter.refresh.time / 1000);
						if(nativeDroid.plugins.twitter.refresh.time > 10000 && nativeDroid.plugins.twitter.refresh.url) {
							nativeDroid.api.get(nativeDroid.plugins.twitter.request.queryURL+nativeDroid.plugins.twitter.refresh.url,false,nativeDroid.plugins.twitter.append);
							setTimeout(nativeDroid.plugins.twitter.refresh.load,nativeDroid.plugins.twitter.refresh.time);
						} else {
							console.log("Refresh timer invalid or refresh URL not set.");
						}
						logDate = new Date();
					}
				},
				request : {
					search : {
						q : {
							"parameter" : "q",
							"required" : true,
							"value" : false
						},
						callback : {
							"parameter" : "callback",
							"required" : false,
							"value" : false
						},
						geocode : {
							"parameter" : "geocode",
							"required" : false,
							"value" : false
						},
						lang : {
							"parameter" : "lang",
							"required" : false,
							"value" : false
						},
						locale : {
							"parameter" : "locale",
							"required" : false,
							"value" : false
						},
						page : {
							"parameter" : "page",
							"required" : false,
							"value" : false
						},
						result_type : {
							"parameter" : "result_type",
							"required" : false,
							"value" : false
						},
						rpp : {
							"parameter" : "rpp",
							"required" : false,
							"value" : false
						},
						show_user : {
							"parameter" : "show_user",
							"required" : false,
							"value" : false
						},
						until : {
							"parameter" : "until",
							"required" : false,
							"value" : false
						},
						since_id : {
							"parameter" : "since_id",
							"required" : false,
							"value" : false
						},
						max_id : {
							"parameter" : "max_id",
							"required" : false,
							"value" : false
						},
						include_entities : {
							"parameter" : "include_entities",
							"required" : false,
							"value" : false
						},
					},
					queryURL : false,
					queryData : false,
					prepareQuery : function() {
						obj = nativeDroid.plugins.twitter.container;
						nativeDroid.plugins.twitter.request.queryData = obj.data('nativedroid-twitter-get');
					}
				},
				ini : function(obj) { 
					nativeDroid.plugins.twitter.container = obj;
					t = obj.attr('data-nativedroid-twitter-type');
					nativeDroid.plugins.twitter.load(t);
					
					// Power up the scrollbar:
					if(nativeDroid.plugins.twitter.container.attr('data-nativedroid-twitter-refresh') != "false") {
						nativeDroid.design.progress.ini();	
					}
					
					// Init refresh
					refreshTime = nativeDroid.plugins.twitter.container.attr('data-nativedroid-twitter-refresh');
					if(refreshTime && refreshTime != "false") {
						nativeDroid.plugins.twitter.refresh.time = (refreshTime != "auto") ? parseInt(refreshTime) : nativeDroid.plugins.twitter.refresh.auto_delay;
						setTimeout(nativeDroid.plugins.twitter.refresh.load,parseInt(nativeDroid.plugins.twitter.refresh.time));
					}

					
				},
				apiUrl : {
					search : "http://search.twitter.com/search.json"
				},
				load : function(type) {
					nativeDroid.plugins.twitter.request.prepareQuery();
					nativeDroid.plugins.twitter.request.queryURL = this.apiUrl[type];
					nativeDroid.api.get(this.request.queryURL,this.request.queryData,this.append);
					nativeDroid.plugins.twitter.populate();
				},
				populate : function() {
					setInterval(function() {
						p = nativeDroid.plugins.twitter.results.pendingResults;
						if(p && p.length > 0) {
							nativeDroid.design.progress.blink();
							nativeDroid.plugins.twitter.container.prepend(p[0]);
							nativeDroid.plugins.twitter.results.pendingResults.splice(0,1);
						    $('.ui-page-active .ui-listview').listview('refresh');
						}					
					},3000);
				},
				append : function(data) {
					if(data) {
						nativeDroid.plugins.twitter.refresh.url = (data.refresh_url) ? data.refresh_url : nativeDroid.plugins.twitter.refresh.url;
						data = (data.results) ? data.results : data;

						anz = data.length;
						// Update Result Count
	    				nativeDroid.plugins.twitter.results.update(anz);

						if(anz > 0) {
							for(i = 0; i < anz;i++) {
								entity = data[i];
								html = "";
								html += "<li>";
										html += "<img src='"+entity.profile_image_url+"'>";
										html += "<h2><a href='http://www.twitter.com/"+entity.from_user+"' data-ajax='false' target='_blank'>"+entity.from_user_name+"</a></h2>";
										html += "<p>"+entity.text+"</p>";
//										html += "<p class='ui-li-aside ui-li-desc'>"+nativeDroid.basic.dateFormat.format(entity.created_at)+"</p>";
								html += "</li>";
								toTimer = i * 1000;
								nativeDroid.plugins.twitter.results.pendingResults.splice(0,0,html);								
							}
						
						
						}
					}

				}
			}
		},
		api : {
			get : function(query,queryData,returnFn) {
			    $.ajax({
			        dataType: 'jsonp',
			        url: query,
			        data : (queryData !== false) ? queryData : "",
			        success: returnFn
			    });
			}
		}
	}
	
	
	// Events

	$("[data-nativedroid-plugin]").each(function(){
		new nativeDroid.plugins[$(this).attr('data-nativedroid-plugin')].ini($(this));
	});
	
	$("[data-nativedroid-maxitems]").each(function() {
		$(this).addClass("nd_autohide_"+$(this).data("nativedroid-maxitems"));
	});
	
	
});