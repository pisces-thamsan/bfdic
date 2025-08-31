// 词典数据（改成let使其可以被重新赋值）
let dictionaryData = [
    // 世界观专有名词
    {word: "Alueté", phonetic: "/ˈʌlɯtʰ/", partOfSpeech: "n.", grammaticalCase: "主宾同形", definition: "犁宿星系；犁辕座", example: "Gericod Alueté tias!<br>欢迎来到犁宿星系！"},
    {word: "Benfoure", phonetic: "/ˈbɛnfɔuɻ/", partOfSpeech: "n.", grammaticalCase: "主格", definition: "本弗尔；本弗尔王国", example: "Gericod Benfoure tias!<br>欢迎来到本弗尔王国！"},
    {word: "Jogul", phonetic: "/ˈdʒɔkul/", partOfSpeech: "n.", grammaticalCase: "主宾同形", definition: "（本弗尔神话&珊教神话中的）使者；卿", example: "Benfou Montoré Jogul<br>梧桐十二卿"},
    {word: "Senkolie", phonetic: "/ˈsɛnkʰɔliɛ/", partOfSpeech: "n.", grammaticalCase: "主格", definition: "怀川；怀国", example: "Dal Senkolie Benfouracieh.<br>怀国在本弗尔旁边。"},
    // 名词
      // Aa
    {word: "alcane", phonetic: "/ˈʌlkʰʌɪn/", partOfSpeech: "n.", grammaticalCase: "主格", definition: "眼泪", example: "Kleš ragép ven gēnira hont alcane apont gēnira.<br>眉梢的汗珠啊，胜过眉下的眼泪。"},
    {word: "apríche", phonetic: "/ˈʌp̚ɹikʰɛ/", partOfSpeech: "n.", grammaticalCase: "主格", definition: "风；气流；呼吸（aprích的主格形式）", example: "Kleš aprích ulamkó hatey Benfoure sisinttand money.<br>想你的风还是(吹)到了本弗尔。"},
    {word: "aprích", phonetic: "/ˈʌp̚ɹikʰ/", partOfSpeech: "n.", grammaticalCase: "宾格", definition: "风；气流；呼吸", example: "Kleš aprích ulamkó hatey Benfoure sisinttand money.<br>想你的风还是(吹)到了本弗尔。"},
    {word: "arome", phonetic: "/aˈɻoʊmɛ/", partOfSpeech: "n.", grammaticalCase: "主格", definition: "云；云朵；一团（物质）；&lt;珊教词汇&gt;云间地", example: "Aromentó（= Arome mentó）<br>向云走"},
    {word: "àetep", phonetic: "/aɛtʰɛp̚/", partOfSpeech: "n.", grammaticalCase: "主格", definition: "真理；真谛；道理", example: "Nekoras acum lingas àetepole<br>身安一隅，心向至理"},
    {word: "àetepole", phonetic: "/aɛtʰɛpʰɔlɛ/", partOfSpeech: "n.", grammaticalCase: "向格（抽象&无灵）", definition: "真理；真谛；道理", example: "Nekoras acum lingas àetepole<br>身安一隅，心向至理"},
      // Ee
    {word: "Eirine", phonetic: "/ɛiˈɻʌinɛ/", partOfSpeech: "n.", grammaticalCase: "主格", definition: "我", example: "Eirine necor et.<br>我是人。"},
      // Ff
    {word: "fulane", phonetic: "/fɯˈlʌnɛ/", partOfSpeech: "n.", grammaticalCase: "主格", definition: "猫", example: "Kleš fulane Eirinam et.<br>这是我的猫。"},
      // Ii
    {word: "irise", phonetic: "/i'ɹisɛ/", partOfSpeech: "n.", grammaticalCase: "主格", definition: "死；死亡；破灭（iris的主格形式）", example: "Necore iris metare.<br>人终有一死。"},
    {word: "iris", phonetic: "/i'ɹis/", partOfSpeech: "n.", grammaticalCase: "宾格", definition: "死；死亡；破灭", example: "Necore iris metare.<br>人终有一死。"},
      // Ll
    {word: "lucias", phonetic: "/ˈlɯk̚ʃiʌs/", partOfSpeech: "n.", grammaticalCase: "主宾同形", definition: "娱乐；消遣；露西亚（人名）", example: "Aege ath lucias<br>当作娱乐一般"}, 
      // Nn
    {word: "necore", phonetic: "/ni'kʰɔɻɛ/", partOfSpeech: "n.", grammaticalCase: "主格", definition: "人；人类", example: "Coyare necore<br>人类社会"},
      // Zz
    {word: "zalone", phonetic: "/zʌˈlɔnɛ/", partOfSpeech: "n.", grammaticalCase: "主格", definition: "沙；沙子；沙粒；硅；硅元素", example: "Màf zalone musbla scola daze musblitam dolént zalonseol aposisint zalon moš rimar.<br>每一粒沙都囚禁着一个世界，而世界本身，不过是另一片更辽阔沙海中的一粒沙。"},
    {word: "zalon", phonetic: "/zʌˈlɔn/", partOfSpeech: "n.", grammaticalCase: "宾格", definition: "沙；沙子；沙粒；硅；硅元素", example: "Dal Musblae zalon et.<br>世界是一粒沙子。"},
    // 动词
    {word: "afuce", phonetic: "/ʌˈfjɯkʰɛ/", partOfSpeech: "v.", tense: "一般现在时", voice: "主动", definition: "加；增加", example: "Moš qoak moš afuce á nam.<br>一加上一等于二。"},
    {word: "hatey", phonetic: "/hʌˈtʰɛi/", partOfSpeech: "v.", tense: "一般现在时", voice: "主动", definition: "喜欢；喜爱", example: "Eirine ulakó hatey.<br>我喜欢你。"},
    {word: "reisen", phonetic: "/ˈɻɜisɛn/", partOfSpeech: "v.", tense: "一般现在时", voice: "被动", definition: "控制；操纵（reis的被动形式）", example: "Dal line corisön kí atzēn reisen<br>心儿被她如冰雪般控制着融化"},
    // 形容词
    {word: "necorelam", phonetic: "/nikʰɔˈɻɛlʌm/", partOfSpeech: "adj.", definition: "自然的；纯净的", example: "Dal vacur necorelam, āmtanob et.<br>自然的馈赠是无价的。"},
    // 数词
    {word: "atmoš", phonetic: "/ˈʌt̚mɔʃ/", partOfSpeech: "num./n.", grammaticalCase: "基数词", definition: "num.零；n.空", example: "Atmoš Eletène<br>一切皆空。"},
    {word: "moš", phonetic: "/mɔʃ/", partOfSpeech: "num./adj.", grammaticalCase: "基数词", definition: "num.一；一个；adj.一个的；单独的", example: "Moš necore cinisó tias.<br>我一个人来到城里面。"},
    {word: "nam", phonetic: "/nʌm/", partOfSpeech: "num./adj.", grammaticalCase: "基数词", definition: "num.二；两；两个；adj.两个的；不专注的；有二心的", example: "Moš qoak moš afuce á nam.<br>一加上一等于二。"},
    {word: "truate", phonetic: "/t͡ʃʰɯʌtɛ/", partOfSpeech: "num./adj.", grammaticalCase: "基数词", definition: "num.三；三个；adj.三个的；层叠的", example: "Moš qoak nam afuce á truate.<br>一加上二等于三。"},
    {word: "dior", phonetic: "/djɔɻ/", partOfSpeech: "num./adj.", grammaticalCase: "基数词", definition: "num.四；四个；adj.四个的；周围的；周身的", example: "Moš qoak truate afuce á dior.<br>一加上三等于四。"},
    {word: "ben", phonetic: "/bɛn/", partOfSpeech: "num./adj.", grammaticalCase: "基数词", definition: "num.五；五个；adj.五个的；多少；几多；几许", example: "Nam qoak truate afuce á ben.<br>二加上三等于五。"}
    // 语法格后缀
];
