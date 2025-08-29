// DOM元素
const dictionaryList = document.getElementById('dictionary-list');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const themeToggle = document.getElementById('theme-toggle');
const addWordBtn = document.getElementById('add-word-btn');
const wordModal = document.getElementById('word-modal');
const closeModal = document.getElementById('close-modal');
const wordForm = document.getElementById('word-form');

// 渲染词典列表
function renderDictionaryList(words) {
    dictionaryList.innerHTML = '';

    if (words.length === 0) {
        dictionaryList.innerHTML = '<div class="no-results">未找到匹配的单词</div>';
        return;
    }

    words.forEach(wordData => {
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
}

// 搜索功能
function searchWords() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        renderDictionaryList(dictionaryData);
        return;
    }

    const filteredWords = dictionaryData.filter(wordData =>
        wordData.word.toLowerCase().includes(searchTerm) ||
        wordData.definition.toLowerCase().includes(searchTerm)
    );

    renderDictionaryList(filteredWords);
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

    dictionaryData.push(newWord);
    renderDictionaryList(dictionaryData);
    closeWordModal();
}

// 事件监听
searchInput.addEventListener('input', searchWords);
searchBtn.addEventListener('click', searchWords);
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

// 初始化渲染
renderDictionaryList(dictionaryData);
