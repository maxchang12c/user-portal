var allCountries = [
  ['阿富汗', 'af', '93'],
  ['阿尔巴尼亚', 'al', '355'],
  ['阿尔及利亚', 'dz', '213'],
  ['美属萨摩亚', 'as', '1684'],
  ['安道尔', 'ad', '376'],
  ['安哥拉', 'ao', '244'],
  ['安圭拉', 'ai', '1264'],
  ['安提瓜和巴布达', 'ag', '1268'],
  ['阿根廷', 'ar', '54'],
  ['亚美尼亚', 'am', '374'],
  ['阿鲁巴', 'aw', '297'],
  ['澳大利亚', 'au', '61', 0],
  ['奥地利', 'at', '43'],
  ['阿塞拜疆', 'az', '994'],
  ['巴哈马', 'bs', '1242'],
  ['巴林', 'bh', '973'],
  ['孟加拉国', 'bd', '880'],
  ['巴巴多斯', 'bb', '1246'],
  ['白俄罗斯', 'by', '375'],
  ['比利时', 'be', '32'],
  ['伯利兹', 'bz', '501'],
  ['贝宁', 'bj', '229'],
  ['百慕大', 'bm', '1441'],
  ['不丹', 'bt', '975'],
  ['玻利维亚, 多民族国', 'bo', '591'],
  ['波斯尼亚和黑塞哥维那', 'ba', '387'],
  ['博茨瓦纳', 'bw', '267'],
  ['巴西', 'br', '55'],
  ['英属印度洋领地', 'io', '246'],
  ['英属维尔京群岛', 'vg', '1284'],
  ['文莱达鲁萨兰国', 'bn', '673'],
  ['保加利亚', 'bg', '359'],
  ['布基纳法索', 'bf', '226'],
  ['布隆迪', 'bi', '257'],
  ['柬埔寨', 'kh', '855'],
  ['喀麦隆', 'cm', '237'],
  [
    '加拿大',
    'ca',
    '1',
    1,
    [
      '204',
      '226',
      '236',
      '249',
      '250',
      '289',
      '306',
      '343',
      '365',
      '387',
      '403',
      '416',
      '418',
      '431',
      '437',
      '438',
      '450',
      '506',
      '514',
      '519',
      '548',
      '579',
      '581',
      '587',
      '604',
      '613',
      '639',
      '647',
      '672',
      '705',
      '709',
      '742',
      '778',
      '780',
      '782',
      '807',
      '819',
      '825',
      '867',
      '873',
      '902',
      '905',
    ],
  ],
  ['佛得角', 'cv', '238'],
  ['博内尔岛, 圣尤斯特歇斯和萨巴', 'bq', '599', 1],
  ['开曼群岛', 'ky', '1345'],
  ['中非共和国', 'cf', '236'],
  ['乍得', 'td', '235'],
  ['智利', 'cl', '56'],
  ['中国', 'cn', '86'],
  ['圣诞岛', 'cx', '61', 2],
  ['科科斯群岛', 'cc', '61', 1],
  ['哥伦比亚', 'co', '57'],
  ['科摩罗', 'km', '269'],
  ['刚果民主共和国', 'cd', '243'],
  ['刚果', 'cg', '242'],
  ['库克群岛', 'ck', '682'],
  ['哥斯达黎加', 'cr', '506'],
  ['科特迪瓦', 'ci', '225'],
  ['克罗地亚', 'hr', '385'],
  ['古巴', 'cu', '53'],
  ['库拉索', 'cw', '599', 0],
  ['塞浦路斯', 'cy', '357'],
  ['捷克', 'cz', '420'],
  ['丹麦', 'dk', '45'],
  ['吉布提', 'dj', '253'],
  ['多米尼克', 'dm', '1767'],
  ['多明尼加共和国', 'do', '1', 2, ['809', '829', '849']],
  ['厄瓜多尔', 'ec', '593'],
  ['埃及', 'eg', '20'],
  ['萨尔瓦多', 'sv', '503'],
  ['赤道几内亚', 'gq', '240'],
  ['厄立特里亚', 'er', '291'],
  ['爱沙尼亚', 'ee', '372'],
  ['埃塞俄比亚', 'et', '251'],
  ['（马尔维纳斯群岛）福克兰群岛', 'fk', '500'],
  ['法罗群岛', 'fo', '298'],
  ['斐济', 'fj', '679'],
  ['芬兰', 'fi', '358', 0],
  ['法国', 'fr', '33'],
  ['法属圭亚那', 'gf', '594'],
  ['法属波利尼西亚', 'pf', '689'],
  ['加蓬', 'ga', '241'],
  ['冈比亚', 'gm', '220'],
  ['格鲁吉亚', 'ge', '995'],
  ['德国', 'de', '49'],
  ['加纳', 'gh', '233'],
  ['直布罗陀', 'gi', '350'],
  ['希腊', 'gr', '30'],
  ['格陵兰岛', 'gl', '299'],
  ['格林纳达', 'gd', '1473'],
  ['瓜德罗普岛', 'gp', '590', 0],
  ['关岛', 'gu', '1671'],
  ['危地马拉', 'gt', '502'],
  ['根西岛', 'gg', '44', 1],
  ['几内亚', 'gn', '224'],
  ['几内亚比绍', 'gw', '245'],
  ['圭亚那', 'gy', '592'],
  ['海地', 'ht', '509'],
  ['洪都拉斯', 'hn', '504'],
  ['中国香港', 'hk', '852'],
  ['匈牙利', 'hu', '36'],
  ['冰岛', 'is', '354'],
  ['印度', 'in', '91'],
  ['印度尼西亚', 'id', '62'],
  ['伊朗伊斯兰共和国', 'ir', '98'],
  ['伊拉克', 'iq', '964'],
  ['爱尔兰', 'ie', '353'],
  ['马恩岛', 'im', '44', 2],
  ['以色列', 'il', '972'],
  ['意大利', 'it', '39', 0],
  ['牙买加', 'jm', '1876'],
  ['日本', 'jp', '81'],
  ['泽西岛', 'je', '44', 3],
  ['约旦', 'jo', '962'],
  ['哈萨克斯坦', 'kz', '7', 1],
  ['肯尼亚', 'ke', '254'],
  ['基里巴斯', 'ki', '686'],
  ['Kosovo', 'xk', '383'],
  ['科威特', 'kw', '965'],
  ['吉尔吉斯斯坦', 'kg', '996'],
  ['老挝', 'la', '856'],
  ['拉脱维亚', 'lv', '371'],
  ['黎巴嫩', 'lb', '961'],
  ['莱索托', 'ls', '266'],
  ['利比里亚', 'lr', '231'],
  ['利比亚', 'ly', '218'],
  ['列支敦士登', 'li', '423'],
  ['立陶宛', 'lt', '370'],
  ['卢森堡', 'lu', '352'],
  ['中国澳门', 'mo', '853'],
  ['马其顿, 前南斯拉夫共和国', 'mk', '389'],
  ['马达加斯加', 'mg', '261'],
  ['马拉维', 'mw', '265'],
  ['马来西亚', 'my', '60'],
  ['马尔代夫', 'mv', '960'],
  ['马里', 'ml', '223'],
  ['马耳他', 'mt', '356'],
  ['马绍尔群岛', 'mh', '692'],
  ['马提尼克岛', 'mq', '596'],
  ['毛里塔尼亚', 'mr', '222'],
  ['毛里求斯', 'mu', '230'],
  ['马约特', 'yt', '262', 1],
  ['墨西哥', 'mx', '52'],
  ['密克罗尼西亚联邦', 'fm', '691'],
  ['摩尔多瓦共和国', 'md', '373'],
  ['摩纳哥', 'mc', '377'],
  ['蒙古', 'mn', '976'],
  ['黑山', 'me', '382'],
  ['蒙特塞拉特', 'ms', '1664'],
  ['摩洛哥', 'ma', '212', 0],
  ['莫桑比克', 'mz', '258'],
  ['缅甸', 'mm', '95'],
  ['纳米比亚', 'na', '264'],
  ['瑙鲁', 'nr', '674'],
  ['尼泊尔', 'np', '977'],
  ['荷兰', 'nl', '31'],
  ['新喀里多尼亚', 'nc', '687'],
  ['新西兰', 'nz', '64'],
  ['尼加拉瓜', 'ni', '505'],
  ['尼日尔', 'ne', '227'],
  ['尼日利亚', 'ng', '234'],
  ['纽埃', 'nu', '683'],
  ['诺福克岛', 'nf', '672'],
  ['朝鲜', 'kp', '850'],
  ['北马里亚纳群岛', 'mp', '1670'],
  ['挪威', 'no', '47', 0],
  ['阿曼', 'om', '968'],
  ['巴基斯坦', 'pk', '92'],
  ['帕劳', 'pw', '680'],
  ['巴勒斯坦', 'ps', '970'],
  ['巴拿马', 'pa', '507'],
  ['巴布亚新几内亚', 'pg', '675'],
  ['巴拉圭', 'py', '595'],
  ['秘鲁', 'pe', '51'],
  ['菲律宾', 'ph', '63'],
  ['波兰', 'pl', '48'],
  ['葡萄牙', 'pt', '351'],
  ['波多黎各', 'pr', '1', 3, ['787', '939']],
  ['卡塔尔', 'qa', '974'],
  ['留尼旺岛', 're', '262', 0],
  ['罗马尼亚', 'ro', '40'],
  ['俄罗斯联邦', 'ru', '7', 0],
  ['卢旺达', 'rw', '250'],
  ['圣巴泰勒米', 'bl', '590', 1],
  ['圣赫勒拿, 阿森松岛和特里斯坦 - 达库尼亚群岛', 'sh', '290'],
  ['圣基茨和尼维斯', 'kn', '1869'],
  ['圣卢西亚', 'lc', '1758'],
  ['圣马丁（法国部分）', 'mf', '590', 2],
  ['圣皮埃尔和密克隆岛', 'pm', '508'],
  ['圣文森特和格林纳丁斯', 'vc', '1784'],
  ['萨摩亚', 'ws', '685'],
  ['圣马力诺', 'sm', '378'],
  ['圣多美和普林西比', 'st', '239'],
  ['沙特阿拉伯', 'sa', '966'],
  ['塞内加尔', 'sn', '221'],
  ['塞尔维亚', 'rs', '381'],
  ['塞舌耳', 'sc', '248'],
  ['塞拉利昂', 'sl', '232'],
  ['新加坡', 'sg', '65'],
  ['圣马丁岛（荷兰部分）', 'sx', '1721'],
  ['斯洛伐克', 'sk', '421'],
  ['斯洛文尼亚', 'si', '386'],
  ['所罗门群岛', 'sb', '677'],
  ['索马里', 'so', '252'],
  ['南非', 'za', '27'],
  ['韩国', 'kr', '82'],
  ['南苏丹', 'ss', '211'],
  ['西班牙', 'es', '34'],
  ['斯里兰卡', 'lk', '94'],
  ['苏丹红', 'sd', '249'],
  ['苏里南', 'sr', '597'],
  ['斯瓦尔巴和扬马延岛', 'sj', '47', 1],
  ['斯威士兰', 'sz', '268'],
  ['瑞典', 'se', '46'],
  ['瑞士', 'ch', '41'],
  ['阿拉伯叙利亚共和国', 'sy', '963'],
  ['中国台湾', 'tw', '886'],
  ['塔吉克斯坦', 'tj', '992'],
  ['坦桑尼亚联合共和国', 'tz', '255'],
  ['泰国', 'th', '66'],
  ['东帝汶', 'tl', '670'],
  ['多哥', 'tg', '228'],
  ['托克劳群岛', 'tk', '690'],
  ['汤加', 'to', '676'],
  ['特立尼达和多巴哥', 'tt', '1868'],
  ['突尼斯', 'tn', '216'],
  ['土耳其', 'tr', '90'],
  ['土库曼斯坦', 'tm', '993'],
  ['特克斯和凯科斯群岛', 'tc', '1649'],
  ['图瓦卢', 'tv', '688'],
  ['美属维京群岛', 'vi', '1340'],
  ['乌干达', 'ug', '256'],
  ['乌克兰', 'ua', '380'],
  ['阿联酋', 'ae', '971'],
  ['英国', 'gb', '44', 0],
  ['美国', 'us', '1', 0],
  ['乌拉圭', 'uy', '598'],
  ['乌兹别克斯坦', 'uz', '998'],
  ['瓦努阿图', 'vu', '678'],
  ['教廷（梵蒂冈城国）', 'va', '39', 1],
  ['委内瑞拉玻利瓦尔共和国', 've', '58'],
  ['越南', 'vn', '84'],
  ['瓦利斯和富图纳群岛', 'wf', '681'],
  ['西撒哈拉', 'eh', '212', 1],
  ['也门', 'ye', '967'],
  ['赞比亚', 'zm', '260'],
  ['津巴布韦', 'zw', '263'],
  ['奥兰群岛', 'ax', '358', 1],
];

export const countriesDataZhCn = allCountries.map(country => ({
  name: country[0],
  iso2: country[1].toUpperCase(),
  dialCode: country[2],
  priority: country[3] || 0,
  areaCodes: country[4] || null,
}));