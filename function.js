// 词典数据（从JSON文件加载）
let dictionaryData = [];

// DOM元素
const dictionaryList = document.getElementById('dictionary-list');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const refreshBtn = document.getElementById('refresh-btn');
const themeToggle = document.getElementById('theme-toggle');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsModal = document.getElementById('close-settings-modal');
const wordForm = document.getElementById('word-form');
const totalWordsElement = document.getElementById('total-words');
const displayedWordsElement = document.getElementById('displayed-words');
const randomCountElement = document.getElementById('random-count');
const themeSwitch = document.getElementById('theme-switch');
const randomCountOptions = document.querySelectorAll('input[name="random-count"]');

// 状态变量
let isSearching = false;
let userRandomCount = 10; // 默认值

// 从JSON文件加载词典数据
async function loadDictionaryData() {
    try {
        const response = await fetch('dictionary.json');
        if (!response.ok) {
            throw new Error('无法加载词典数据');
        }
        dictionaryData = await response.json();
        return dictionaryData;
    } catch (error) {
        console.error('加载词典数据失败:', error);
        // 使用默认数据作为备选
        dictionaryData = [
            { word: "Alueté", phonetic: "/ˈʌlɯtʰ/", partOfSpeech: "n.", grammaticalCase: "主宾同形", definition: "犁宿星系；犁辕座", example: "Gericod Alueté tias!<br>欢迎来到犁宿星系！" },
            { word: "Benfoure", phonetic: "/ˈbɛnfɔuɻ/", partOfSpeech: "n.", grammaticalCase: "主格", definition: "本弗尔；本弗尔王国", example: "Gericod Benfoure tias!<br>欢迎来到本弗尔王国！" },
            { word: "Jogul", phonetic: "/ˈdʒɔkul/", partOfSpeech: "n.", grammaticalCase: "主宾同形", definition: "（本弗尔神话&珊教神话中的）使者；卿", example: "Benfou Montoré Jogul<br>梧桐十二卿" }
        ];
        return dictionaryData;
    }
}

// 获取随机单词
function getRandomWords(words, count) {
    if (words.length <= count) return words.slice();

    const shuffled = [...words].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// 更新单词统计信息
function updateWordStats(displayedCount) {
    totalWordsElement.textContent = dictionaryData.length;
    displayedWordsElement.textContent = displayedCount;
    randomCountElement.textContent = userRandomCount;
}

// 渲染词典列表
function renderDictionaryList(words, isRandom = false) {
    dictionaryList.innerHTML = '';

    if (words.length === 0) {
        dictionaryList.innerHTML = '<div class="no-results">未找到匹配的单词</div>';
        updateWordStats(0);
        return;
    }

    const wordsToDisplay = isRandom ? getRandomWords(words, userRandomCount) : words;

    wordsToDisplay.forEach(wordData => {
        const wordCard = document.createElement('div');
        wordCard.className = 'word-card';

        // 构建语法标签
        let grammarTags = '';
        if (wordData.grammaticalCase) {
            grammarTags += `<span class="grammar-tag">${wordData.grammaticalCase}</span>`;
        }
        if (wordData.tense) {
            grammarTags += `<span class="grammar-tag">${wordData.tense}</span>`;
        }
        if (wordData.voice) {
            grammarTags += `<span class="grammar-tag">${wordData.voice}语态</span>`;
        }

        wordCard.innerHTML = `
                    <div class="word-header">
                        <span class="word-title">${wordData.word}</span>
                        <span class="phonetic">${wordData.phonetic}</span>
                    </div>
                    <div class="part-of-speech">${wordData.partOfSpeech}</div>
                    ${grammarTags ? `<div class="grammar-info">${grammarTags}</div>` : ''}
                    <div class="definition">${wordData.definition}</div>
                    ${wordData.example ? `<div class="example">${wordData.example}</div>` : ''}
                `;

        dictionaryList.appendChild(wordCard);
    });

    updateWordStats(wordsToDisplay.length);
}

// 搜索功能
function searchWords() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        isSearching = false;
        renderDictionaryList(dictionaryData, true);
        return;
    }

    isSearching = true;
    const filteredWords = dictionaryData.filter(wordData =>
        wordData.word.toLowerCase().includes(searchTerm) ||
        wordData.definition.toLowerCase().includes(searchTerm)
    );

    renderDictionaryList(filteredWords, false);
}

// 刷新随机单词
function refreshRandomWords() {
    isSearching = false;
    searchInput.value = '';
    renderDictionaryList(dictionaryData, true);
    showNotification("已刷新随机单词");
}

// 切换主题
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    themeSwitch.checked = isDarkMode;

    // 保存主题偏好
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// 打开设置模态框
function openSettingsModal() {
    settingsModal.style.display = 'flex';

    // 设置当前主题状态
    themeSwitch.checked = document.body.classList.contains('dark-mode');

    // 设置当前随机单词数量选项
    document.querySelector(`input[name="random-count"][value="${userRandomCount}"]`).checked = true;
}

// 关闭设置模态框
function closeSettingsModalFunc() {
    settingsModal.style.display = 'none';
    wordForm.reset();
}

// 更新随机单词数量
function updateRandomCount(count) {
    userRandomCount = parseInt(count);
    randomCountElement.textContent = userRandomCount;

    // 保存用户偏好
    localStorage.setItem('randomCount', userRandomCount);

    // 如果不是在搜索中，刷新显示
    if (!isSearching) {
        renderDictionaryList(dictionaryData, true);
    }
}

// 添加新词条
function addNewWord(event) {
    event.preventDefault();

    const newWord = {
        word: document.getElementById('word').value,
        phonetic: document.getElementById('phonetic').value,
        partOfSpeech: document.getElementById('partOfSpeech').value,
        grammaticalCase: document.getElementById('grammaticalCase').value,
        tense: document.getElementById('tense').value,
        voice: document.getElementById('voice').value,
        definition: document.getElementById('definition').value,
        example: document.getElementById('example').value
    };

    // 添加到数据数组
    dictionaryData.push(newWord);

    // 重新渲染列表
    if (isSearching) {
        searchWords();
    } else {
        renderDictionaryList(dictionaryData, true);
    }

    // 关闭模态框
    closeSettingsModalFunc();

    // 显示添加成功的反馈
    showNotification(`"${newWord.word}" 已成功添加到词典`);
}

// 显示通知
function showNotification(message) {
    // 移除现有的通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    document.body.appendChild(notification);

    // 3秒后自动移除
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// 初始化
async function init() {
    // 加载用户偏好
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    const savedRandomCount = localStorage.getItem('randomCount');
    if (savedRandomCount) {
        userRandomCount = parseInt(savedRandomCount);
    }

    // 加载词典数据
    await loadDictionaryData();

    // 渲染词典列表
    renderDictionaryList(dictionaryData, true);
}

// 事件监听
searchInput.addEventListener('input', searchWords);
searchBtn.addEventListener('click', searchWords);
refreshBtn.addEventListener('click', refreshRandomWords);
themeToggle.addEventListener('click', toggleTheme);
settingsBtn.addEventListener('click', openSettingsModal);
closeSettingsModal.addEventListener('click', closeSettingsModalFunc);
wordForm.addEventListener('submit', addNewWord);

// 主题切换开关事件
themeSwitch.addEventListener('change', toggleTheme);

// 随机单词数量选项事件
randomCountOptions.forEach(option => {
    option.addEventListener('change', (e) => {
        updateRandomCount(e.target.value);
    });
});

// 点击模态框外部关闭
settingsModal.addEventListener('click', (event) => {
    if (event.target === settingsModal) {
        closeSettingsModalFunc();
    }
});

// 初始化应用
init();
