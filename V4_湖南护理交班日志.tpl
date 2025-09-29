<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Document</title>
</head>
<style>
	table {
		border-collapse: collapse;
		width: 100%;
	}

	th,
	td {
		border: 1px solid #000;
		text-align: center;
	}

	.table1 td {
		width: 40px;
	}

	.table2 td:first-child {
		width: 100px;
	}

	.table3 td {
		min-width: 40px;
		height: 15px;
		ling-height: 15px;
	}
</style>

<%
    var toAp = (row,len) => {
      let arr = [];
      let index = 0;
      while(index < row.length){
        let list = row.slice(index,index + len);
        if(list.length < len){
          list.push({})
        }
        arr.push(list)
        index = index + len;
      }
      return arr;
    }

    var getHeadwidth = (index) =>{
      let style = '';
      if(records){
        //打印
        style = index === 0 ? 'width:90px' : index === 1 ? 'width:40px' : index === 2 ? 'width:50px' : index === 3 ? 'width:60px' : index === 4 ? 'width:60px'  :index === 5 ? 'width:140px'  : 'width:200px;'
      }else{
        //导出
        style = index === 0 ? 'width:60px' : index === 1 ? 'width:20px' : index === 2 ? 'width:30px' : index === 3 ? 'width:70px' : index === 4 ? 'width:60px'  :index === 5 ? 'width:140px': 'width:140px'
      }
      return style;
    }
  %>
{{set autograph = singers.length === 4 ? ['护士长签名', '白班签名', '晚班签名', '夜班签名'] : ['护士长签名', '交班','接班','交班','接班','交班','接班']}}
{{if records}}

<body style="font-size:12px;padding-bottom:0;margin-bottom:0;">
	<h2 style="text-align: center;">
		<img src="{{hospitalLogo}}" style="vertical-align:middle;margin-right:12px;width:40pt;" />
    {{departmentName}}护理交班日志
  </h2>
		<div style="text-align:right;margin-top:-25px;">日期：{{format(moment(date),'YYYY-MM-DD ')}}</div>
		{{if currentPage === 1}}
		<table class="table1">
			<tr>
				{{each column1 || []}}
				<th>{{$value.title}}</th>
				{{/each}}
			</tr>
			{{each row1 || [] val key}}
			<tr>
				{{each column1 || []}}
				<td>{{val[$value.dataIndex]}}</td>
				{{/each}}
			</tr>
			{{/each}}
		</table>
		<div style="height: 5px;"></div>
		<!-- <div>
			<table class="table2">
				{{each toAp(row2,2) || [] toApValue}}
				<tr>
					{{each toApValue || [] val key}}
					{{each column2 || []}}
					<td
						style="{{$index === 0 ? 'text-align: center;width:10%;' : 'text-align: left;word-break: break-all;width:40%;'}}">
						{{val[$value.dataIndex]}}
					</td>
					{{/each}}
					{{/each}}
				</tr>
				{{/each}}
			</table>
		</div> -->
		<div style="height: 5px;"></div>
		<table class="table2">
			<tr>
				<td style="min-width:108px;width:108px;white-space: nowrap;">交班备注</td>
				<td style="word-break: break-all;text-align:left;padding-left:4px;width:100%;">
					<pre style="padding:0;margin:0;word-break: break-all;text-align:left;">{{remarks}}</pre>
				</td>
			</tr>
		</table>
		<div style="height: 5px;"></div>
		<table class="table2">
			<tr>
				<td style="min-width:108px;width:108px;white-space: nowrap;">出院患者交班备注</td>
				<td style="word-break: break-all;text-align:left;padding-left:4px;width:100%;">
					<pre style="padding:0;margin:0;word-break: break-all;text-align:left;">{{patientNotes}}</pre>
				</td>
			</tr>
		</table>
		{{/if}}
		<div style="page-break-after:always;">
			<div style="height: 5px;"></div>
			<div>
				<table class="table3">
					<tr>
						<!-- 需要固定宽度，写死 -->
						{{each column3 || []}}
						<th style="{{getHeadwidth($index)}}">{{$value.title}}</th>
						{{/each}}
					</tr>
					{{each table[currentPage - 1] val key}}
					<tr>
						{{each column3 || []}}
						{{if val}}
						{{if $value.dataIndex.includes(".")}}
						<td style="{{'word-break: break-all;'+getHeadwidth($index)}}">
							<div style="{{'text-align:left;word-break: break-all;'+getHeadwidth($index)}}">
								<pre
									style="{{'padding:0;margin:0;word-break: break-all;'+getHeadwidth($index)}}">{{(val[$value.dataIndex.split('.')[0]] || {})[$value.dataIndex.split('.')[1]]}}</pre>
							</div>
						</td>
						{{else if typeof val[$value.dataIndex] === 'object'}}
						<td style="{{'word-break: break-all;'+getHeadwidth($index)}}">
							{{(val[$value.dataIndex] || []).join('/')}}</td>
						{{else if $value.title==='性别'}}
						<td style="{{'width: auto;word-break: break-all;'+getHeadwidth($index)}}">
							{{val[$value.dataIndex]===1?"男":val[$value.dataIndex]===2?"女":"-"}}
						</td>
						{{else}}
						<td style="{{'width: auto;word-break: break-all;'+getHeadwidth($index)}}">
							{{val[$value.dataIndex]}}
						</td>
						{{/if}}
						{{else}}
						<td></td>
						{{/if}}
						{{/each}}
					</tr>
					{{/each}}
					<tfoot>
						{{if currentPage === table.length || table.length === 0}}
						{{if singers.length === 4}}
						<tr>
							{{each autograph value key}}
							<td colspan="{{key === 0 ? column3.length-3 :1}}" style="text-align: left;min-width:120px;">
								<span style="text-align: left; display: inline-flex; align-items: center; white-space: nowrap;">
                                    {{value}}：
                                    {{if singers[key] && singers[key]['signPic']}}
                                    <img src="{{singers[key]['signPic']}}" style="height:16px;vertical-align:middle;" />
                                    {{else}}
                                    {{singers[key]['name']}}
                                    {{/if}}
                                </span>
							</td>
							{{/each}}
						</tr>
						{{else}}
						<tr>
							<td colspan="6" style="text-align: left;min-width:120px;">
								<span style="text-align: left; display: inline-flex; align-items: center; white-space: nowrap;">
                                    <!-- {{autograph[0]}}：
                                    {{if singers[0] && singers[0]['signPic']}}
                                    <img src="{{singers[0]['signPic']}}" style="height:16px;vertical-align:middle;" />
                                    {{else}}
                                    {{singers[0]['name']}}
                                    {{/if}} -->
                                </span>
							</td>
							<td colspan="1" style="text-align: left;min-width:20px;">
								<span style="text-align: left;">
                                </span>
							</td>
							<td colspan="1" style="text-align: left;min-width:120px;">
								<div style="display: flex;justify-content: space-between; align-items: center;">
									<span style="text-align: left;flex:1; display: inline-flex; align-items: center;">
                                        {{autograph[1]}}：
                                        {{if singers[1] && singers[1]['signPic']}}
                                        <img src="{{singers[1]['signPic']}}" style="height:16px;vertical-align:middle;" />
                                        {{else}}
                                        {{singers[1]['name']}}
                                        {{/if}}
                                    </span>
									<span style="text-align: left;flex:1; display: inline-flex; align-items: center;">
                                        <!-- {{autograph[2]}}：
                                        {{if singers[2] && singers[2]['signPic']}}
                                        <img src="{{singers[2]['signPic']}}" style="height:16px;vertical-align:middle;" />
                                        {{else}}
                                        {{singers[2]['name']}}
                                        {{/if}} -->
                                    </span>
								</div>
							</td>
							<td colspan="1" style="text-align: left;min-width:120px;">
								<div style="display: flex;justify-content: space-between; align-items: center;">
									<span style="text-align: left;flex:1; display: inline-flex; align-items: center;">
                                        {{autograph[3]}}：
                                        {{if singers[3] && singers[3]['signPic']}}
                                        <img src="{{singers[3]['signPic']}}" style="height:16px;vertical-align:middle;" />
                                        {{else}}
                                        {{singers[3]['name']}}
                                        {{/if}}
                                    </span>
									<span style="text-align: left;flex:1; display: inline-flex; align-items: center;">
                                        <!-- {{autograph[4]}}：
                                        {{if singers[4] && singers[4]['signPic']}}
                                        <img src="{{singers[4]['signPic']}}" style="height:16px;vertical-align:middle;" />
                                        {{else}}
                                        {{singers[4]['name']}}
                                        {{/if}} -->
                                    </span>
								</div>
							</td>
							<td colspan="1" style="text-align: left;min-width:120px;">
								<div style="display: flex;justify-content: space-between; align-items: center;">
									<span style="text-align: left;flex:1; display: inline-flex; align-items: center;">
                                        {{autograph[5]}}：
                                        {{if singers[5] && singers[5]['signPic']}}
                                        <img src="{{singers[5]['signPic']}}" style="height:16px;vertical-align:middle;" />
                                        {{else}}
                                        {{singers[5]['name']}}
                                        {{/if}}
                                    </span>
									<span style="text-align: left;flex:1; display: inline-flex; align-items: center;">
                                        <!-- {{autograph[6]}}：
                                        {{if singers[6] && singers[6]['signPic']}}
                                        <img src="{{singers[6]['signPic']}}" style="height:16px;vertical-align:middle;" />
                                        {{else}}
                                        {{singers[6]['name']}}
                                        {{/if}} -->
                                    </span>
								</div>
							</td>
						</tr>
						{{/if}}
						{{/if}}
					</tfoot>
				</table>
			</div>
			<div style="text-align: center; margin-top:auto;padding-top: 2px; font-size:14px">
				第{{currentPage}}页</div>
		</div>
</body>
{{else}}

<body style="font-size:11px;">
	<h2 style="text-align: center;">
		<img src="{{hospitalLogo}}" style="vertical-align:middle;margin-right:12px;width:40pt;" />
    {{departmentName}}护理交班日志
  </h2>
		<div style="text-align:right;">日期：{{format(moment(date),'YYYY-MM-DD ')}}</div>
		<table class="table1">
			<tr>
				{{each column1 || []}}
				<th>{{$value.title}}</th>
				{{/each}}
			</tr>
			{{each row1 || [] val key}}
			<tr>
				{{each column1 || []}}
				<td>{{val[$value.dataIndex]}}</td>
				{{/each}}
			</tr>
			{{/each}}
		</table>
		<div style="height: 5px;"></div>
		<div>
			<table class="table2">
				{{each toAp(row2,2) || [] toApValue}}
				<tr>
					{{each toApValue || [] val key}}
					{{each column2 || []}}
					<td
						style="{{$index === 0 ? 'text-align: center;width:10%;white-space: nowrap;' : 'text-align: left;word-break: break-all;width:40%;word-wrap: break-word;'}}">
						<% for(var i = 0; i < (val[$value.dataIndex] || '').length/90; i++){ %>
						<%= (val[$value.dataIndex] || '').slice(i*90,(i+1)*90) %>
						</br>
						<% } %>
					</td>
					{{/each}}
					{{/each}}
				</tr>
				{{/each}}
			</table>
		</div>
		<div style="height: 5px;"></div>
		<table class="table2">
			<tr>
				<td style="min-width:73px;width:73px;white-space: nowrap;">交班备注</td>
				<td style="word-break: break-all;text-align:left;padding-left:4px;width:100%;">
					<pre style="padding:0;margin:0;word-break: break-all;text-align:left;">{{remarks}}</pre>
				</td>
			</tr>
		</table>
		<div style="height: 5px;"></div>
		<table class="table2">
			<tr>
				<td style="min-width:100px;width:100px;white-space: nowrap;">出院患者交班备注</td>
				<td style="word-break: break-all;text-align:left;padding-left:4px;width:100%;">
					<pre style="padding:0;margin:0;word-break: break-all;text-align:left;">{{patientNotes}}</pre>
				</td>
			</tr>
		</table>
		{{each table arr arrkey}}
		<div style="page-break-after:always;">
			{{if arrkey !== 0}}
			<h2 style="text-align: center;">
				<img src="{{hospitalLogo}}" style="vertical-align:middle;margin-right:12px;width:40pt;" />
            {{departmentName}}护理交班日志
          </h2>
				<div style="text-align:right;">日期：{{format(moment(date),'YYYY-MM-DD ')}}</div>
				{{/if}}
				<div style="height: 5px;"></div>
				<div>
					<table class="table3">
						<tr>
							<!-- 需要固定宽度，写死 -->
							{{each column3 || []}}
							<th style="{{getHeadwidth($index)}}">{{$value.title}}</th>
							{{/each}}
						</tr>
						{{each arr val key}}
						<tr>
							{{each column3 || []}}
							{{if val}}
							{{if $value.dataIndex.includes(".")}}
							<td style="{{'word-break: break-all;'+getHeadwidth($index)}}">
								<div style="{{'text-align:left;word-break: break-all;'+getHeadwidth($index)}}">
									<pre
										style="{{'padding:0;margin:0;word-break: break-all;'+getHeadwidth($index)}}">{{(val[$value.dataIndex.split('.')[0]] || {})[$value.dataIndex.split('.')[1]]}}</pre>
								</div>
							</td>
							{{else if typeof val[$value.dataIndex] === 'object'}}
							<td style="{{'word-break: break-all;'+getHeadwidth($index)}}">
								{{(val[$value.dataIndex] || []).join('/')}}</td>
							{{else}}
							<td style="{{'word-break: break-all;'+getHeadwidth($index)}}">{{val[$value.dataIndex]}}</td>
							{{/if}}
							{{else}}
							<td style="{{'word-break: break-all;'+getHeadwidth($index)}}"></td>
							{{/if}}
							{{/each}}
						</tr>
						{{/each}}

						<tfoot>
							{{if arrkey === table.length -1}}
							{{if singers.length === 4}}
							<tr>
								{{each autograph value key}}
								<td colspan="{{key === 0 ? singers.length === 4 ? column3.length-3 : 2:1}}"
									style="text-align: left;min-width:120px;">
									<span style="text-align: left; display: inline-flex; align-items: center; white-space: nowrap;">
                                        {{value}}：
                                        {{if singers[key] && singers[key]['signPic']}}
                                        <img src="{{singers[key]['signPic']}}" style="height:16px;vertical-align:middle;" />
                                        {{else}}
                                        {{singers[key]['name']}}
                                        {{/if}}
                                    </span>
								</td>
								{{/each}}
							</tr>
							{{else}}
							<tr>
								<td colspan="5" style="text-align: left;min-width:120px;">
									<span style="text-align: left; display: inline-flex; align-items: center; white-space: nowrap;">
                                        {{autograph[0]}}：
                                        {{if singers[0] && singers[0]['signPic']}}
                                        <img src="{{singers[0]['signPic']}}" style="height:16px;vertical-align:middle;" />
                                        {{else}}
                                        {{singers[0]['name']}}
                                        {{/if}}
                                    </span>
								</td>
								<td colspan="1" style="text-align: left;min-width:120px;">
									<div style="display: flex;justify-content: space-around; align-items: center;">
										<span style="text-align: left; display: inline-flex; align-items: center; white-space: nowrap;">
                                            {{autograph[1]}}：
                                            {{if singers[1] && singers[1]['signPic']}}
                                            <img src="{{singers[1]['signPic']}}" style="height:16px;vertical-align:middle;" />
                                            {{else}}
                                            {{singers[1]['name']}}
                                            {{/if}}&nbsp;&nbsp;&nbsp;
                                            {{if !(singers[1] && (singers[1]['name'] || singers[1]['signPic']))}}
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            {{/if}}
                                        </span>
										<span style="text-align: left; display: inline-flex; align-items: center; white-space: nowrap;">
                                            {{autograph[2]}}：
                                            {{if singers[2] && singers[2]['signPic']}}
                                            <img src="{{singers[2]['signPic']}}" style="height:16px;vertical-align:middle;" />
                                            {{else}}
                                            {{singers[2]['name']}}
                                            {{/if}}
                                        </span>
									</div>
								</td>
								<td colspan="1" style="text-align: left;min-width:120px;">
									<div style="display: flex;justify-content: space-around; align-items: center;">
										<span style="text-align: left; display: inline-flex; align-items: center; white-space: nowrap;">
                                            {{autograph[3]}}：
                                            {{if singers[3] && singers[3]['signPic']}}
                                            <img src="{{singers[3]['signPic']}}" style="height:16px;vertical-align:middle;" />
                                            {{else}}
                                            {{singers[3]['name']}}
                                            {{/if}}&nbsp;&nbsp;&nbsp;
                                            {{if !(singers[3] && (singers[3]['name'] || singers[3]['signPic']))}}
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            {{/if}}
                                        </span>
										<span style="text-align: left; display: inline-flex; align-items: center; white-space: nowrap;">
                                            {{autograph[4]}}：
                                            {{if singers[4] && singers[4]['signPic']}}
                                            <img src="{{singers[4]['signPic']}}" style="height:16px;vertical-align:middle;" />
                                            {{else}}
                                            {{singers[4]['name']}}
                                            {{/if}}
                                        </span>
									</div>
								</td>
								<td colspan="1" style="text-align: left;min-width:120px;">
									<div style="display: flex;justify-content: space-around; align-items: center;">
										<span style="text-align: left; display: inline-flex; align-items: center; white-space: nowrap;">
                                            {{autograph[5]}}：
                                            {{if singers[5] && singers[5]['signPic']}}
                                            <img src="{{singers[5]['signPic']}}" style="height:16px;vertical-align:middle;" />
                                            {{else}}
                                            {{singers[5]['name']}}
                                            {{/if}}&nbsp;&nbsp;&nbsp;
                                            {{if !(singers[5] && (singers[5]['name'] || singers[5]['signPic']))}}
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            {{/if}}
                                        </span>
										<span style="text-align: left; display: inline-flex; align-items: center; white-space: nowrap;">
                                            {{autograph[6]}}：
                                            {{if singers[6] && singers[6]['signPic']}}
                                            <img src="{{singers[6]['signPic']}}" style="height:16px;vertical-align:middle;" />
                                            {{else}}
                                            {{singers[6]['name']}}
                                            {{/if}}
                                        </span>
									</div>
								</td>
							</tr>
							{{/if}}
							{{/if}}
						</tfoot>
					</table>
				</div>
				<p style="text-align: center; margin-top:auto;padding-top: 2px; padding-right: 12px;font-size:14px">
					第{{arrkey+1}}页</p>
		</div>
		{{/each}}
</body>
{{/if}}

</html>