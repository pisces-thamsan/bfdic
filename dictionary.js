// 词典数据（改成let使其可以被重新赋值）
let dictionaryData = [
    // 世界观设定
    {word: "Alueté", phonetic: "/ˈʌlɯtʰ/", partOfSpeech: "n.", grammaticalCase: "主宾同形", definition: "犁宿星系；犁辕座", example: "Gericod Alueté tias!<br>欢迎来到犁宿星系！"},
    {word: "Benfoure", phonetic: "/ˈbɛnfɔuɻ/", partOfSpeech: "n.", grammaticalCase: "主格", definition: "本弗尔；本弗尔王国", example: "Gericod Benfoure tias!<br>欢迎来到本弗尔王国！"},
    // 名词
    {word: "lucias", phonetic: "/ˈlɯk̚ʃiʌs/", partOfSpeech: "n.", grammaticalCase: "主宾同形", definition: "娱乐；消遣；露西亚（人名）", example: "Aege ath lucias<br>当作娱乐一般"},
    {word: "apríche", phonetic: "/ˈʌp̚ɹikʰ/", partOfSpeech: "n.", grammaticalCase: "主格", definition: "风；气流；呼吸", example: "Kleš aprích ulamkó hatey Benfoure sisinttand money.<br>想你的风还是(吹)到了本弗尔。"},
    {word: "Eirine", phonetic: "/ɛiˈɻʌinɛ/", partOfSpeech: "n.", grammaticalCase: "主格", definition: "我", example: "Eirine necor et.<br>我是人。"},
    {word: "necore", phonetic: "/ni'kʰɔɻɛ/", partOfSpeech: "n.", grammaticalCase: "主格", definition: "人；人类", example: "Coyare necore<br>人类社会"},
    {word: "Jogul", phonetic: "/ˈdʒɔkul/", partOfSpeech: "n.", grammaticalCase: "主宾同形", definition: "（本弗尔神话&珊教神话中的）使者；卿", example: "Benfou Montoré Jogul<br>梧桐十二卿"},
    {word: "zalone", phonetic: "/zʌˈlɔnɛ/", partOfSpeech: "n.", grammaticalCase: "主格", definition: "沙；沙子；沙粒；硅；硅元素", example: "Màf zalone musbla scola daze musblitam dolént zalonseol aposisint zalon moš rimar.<br>每一粒沙都囚禁着一个世界，而世界本身，不过是另一片更辽阔沙海中的一粒沙。"},
    {word: "zalon", phonetic: "/zʌˈlɔn/", partOfSpeech: "n.", grammaticalCase: "宾格", definition: "沙；沙子；沙粒；硅；硅元素", example: "Dal Musblae zalon et.<br>世界是一粒沙子。"},
    {word: "alcane", phonetic: "/ˈʌlkʰʌɪn/", partOfSpeech: "n.", grammaticalCase: "主格", definition: "眼泪", example: "Kleš ragép ven gēnira hont alcane apont gēnira.<br>眉梢的汗珠啊，胜过眉下的眼泪。"},
    {word: "fulane", phonetic: "/fɯˈlʌnɛ/", partOfSpeech: "n.", grammaticalCase: "主格", definition: "猫", example: "Kleš fulane Eirinam et.<br>这是我的猫。"},
    // 动词
    {word: "afuce", phonetic: "/ʌˈfjɯkʰɛ/", partOfSpeech: "v.", tense: "一般现在时", voice: "主动", definition: "加；增加", example: "Moš qoak moš afuce á nam.<br>一加上一等于二。"},
    // 形容词
    {word: "necorelam", phonetic: "/nikʰɔˈɻɛlʌm/", partOfSpeech: "adj.", definition: "自然的；纯净的", example: "Dal vacur necorelam, āmtanob et.<br>自然的馈赠是无价的。"},
    // 数词
    {word: "atmoš", phonetic: "/ˈʌt̚mɔʃ/", partOfSpeech: "num./n.", grammaticalCase: "基数词", definition: "num.零；n.空", example: "Atmoš Eletène<br>一切皆空。"},
    {word: "moš", phonetic: "/mɔʃ/", partOfSpeech: "num./adj.", grammaticalCase: "基数词", definition: "num.一；一个；adj.一个的；单独的", example: "Moš necore cinisó tias.<br>我一个人来到城里面。"},
    {word: "nam", phonetic: "/nʌm/", partOfSpeech: "num./adj.", grammaticalCase: "基数词", definition: "num.二；两；两个；adj.两个的；不专注的；有二心的", example: "Moš qoak moš afuce á nam.<br>一加上一等于二。"},
    // 示例英文单词（24小时内删除）
    {
        word: "take",
        phonetic: "/teɪk/",
        partOfSpeech: "v.",
        tense: "现在时",
        voice: "主动",
        definition: "拿，取；采取",
        example: "He takes the book from the shelf."
    },
    {
        word: "taken",
        phonetic: "/ˈteɪkən/",
        partOfSpeech: "v.",
        tense: "过去分词",
        voice: "被动",
        definition: "被拿；被采取",
        example: "The book was taken from the shelf."
    },
    {
        word: "ephemeral",
        phonetic: "/ɪˈfemərəl/",
        partOfSpeech: "adj.",
        definition: "短暂的，瞬息的",
        example: "Fame in the digital age is often ephemeral."
    },
    {
        word: "whom",
        phonetic: "/huːm/",
        partOfSpeech: "pron.",
        grammaticalCase: "宾格",
        definition: "谁（who的宾格）",
        example: "Whom did you see at the party?"
    },
    {
        word: "ubiquitous",
        phonetic: "/juːˈbɪkwɪtəs/",
        partOfSpeech: "adj.",
        definition: "无所不在的，普遍存在的",
        example: "Smartphones have become ubiquitous in modern society."
    },
    {
        word: "eloquent",
        phonetic: "/ˈeləkwənt/",
        partOfSpeech: "adj.",
        definition: "雄辩的，有说服力的；善于表达的",
        example: "Her eloquent speech moved the entire audience."
    },
    {
        word: "melancholy",
        phonetic: "/ˈmelənkəli/",
        partOfSpeech: "n.",
        definition: "忧郁，悲伤",
        example: "There's a sense of melancholy in his music."
    },
];
