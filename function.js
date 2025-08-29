// DOM元素
const dictionaryList = document.getElementById('dictionary-list');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const refreshBtn = document.getElementById('refresh-btn');
const themeToggle = document.getElementById('theme-toggle');
const addWordBtn = document.getElementById('add-word-btn');
const wordModal = document.getElementById('word-modal');
const closeModal = document.getElementById('close-modal');
const wordForm = document.getElementById('word-form');
const totalWordsElement = document.getElementById('total-words');
const displayedWordsElement = document.getElementById('displayed-words');
const randomCountElement = document.getElementById('random-count');

// 状态变量
let isSearching = false;
const RANDOM_WORD_COUNT = 10;

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
    randomCountElement.textContent = RANDOM_WORD_COUNT;
}

// 渲染词典列表
function renderDictionaryList(words, isRandom = false) {
    dictionaryList.innerHTML = '';

    if (words.length === 0) {
        dictionaryList.innerHTML = '<div class="no-results">未找到匹配的单词</div>';
        updateWordStats(0);
        return;
    }

    const wordsToDisplay = isRandom ? getRandomWords(words, RANDOM_WORD_COUNT) : words;

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
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

// 打开添加单词模态框
function openWordModal() {
    wordModal.style.display = 'flex';
}

// 关闭添加单词模态框
function closeWordModal() {
    wordModal.style.display = 'none';
    wordForm.reset();
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
    closeWordModal();

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
function init() {
    // 模拟加载延迟
    setTimeout(() => {
        renderDictionaryList(dictionaryData, true);
    }, 500);
}

// 事件监听
searchInput.addEventListener('input', searchWords);
searchBtn.addEventListener('click', searchWords);
refreshBtn.addEventListener('click', refreshRandomWords);
themeToggle.addEventListener('click', toggleTheme);
addWordBtn.addEventListener('click', openWordModal);
closeModal.addEventListener('click', closeWordModal);
wordForm.addEventListener('submit', addNewWord);

// 点击模态框外部关闭
wordModal.addEventListener('click', (event) => {
    if (event.target === wordModal) {
        closeWordModal();
    }
});

// 初始化应用
init();
