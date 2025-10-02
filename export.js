// 添加新的事件监听（在现有的事件监听之后）
document.getElementById('export-csv-btn').addEventListener('click', exportToCSV);
document.getElementById('import-csv-btn').addEventListener('click', () => {
    document.getElementById('csv-file-input').click();
});
document.getElementById('csv-file-input').addEventListener('change', handleFileSelect);

// 导出为CSV功能
function exportToCSV() {
    if (dictionaryData.length === 0) {
        showNotification("词典为空，无法导出");
        return;
    }

    // 创建CSV标题行
    const headers = ['word', 'phonetic', 'partOfSpeech', 'grammaticalCase', 'tense', 'voice', 'definition', 'example'];
    const csvContent = [
        headers.join(','),
        ...dictionaryData.map(item => 
            headers.map(header => {
                const value = item[header] || '';
                // 处理包含逗号、换行符或引号的值
                if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            }).join(',')
        )
    ].join('\n');

    // 创建Blob并下载
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `benfoure_dictionary_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification(`已成功导出 ${dictionaryData.length} 个词条`);
}

// 从CSV导入功能
function importFromCSV(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const csvText = e.target.result;
            const lines = csvText.split('\n').filter(line => line.trim());
            
            if (lines.length < 2) {
                showNotification("CSV文件格式错误：至少需要标题行和一行数据");
                return;
            }
            
            // 解析标题行
            const headers = lines[0].split(',').map(header => header.trim());
            
            // 解析数据行
            const importedData = [];
            let successCount = 0;
            let errorCount = 0;
            
            for (let i = 1; i < lines.length; i++) {
                try {
                    const line = lines[i];
                    const values = parseCSVLine(line);
                    
                    if (values.length !== headers.length) {
                        console.warn(`第 ${i+1} 行列数不匹配，跳过`);
                        errorCount++;
                        continue;
                    }
                    
                    const item = {};
                    headers.forEach((header, index) => {
                        let value = values[index] || '';
                        // 移除可能的引号
                        if (value.startsWith('"') && value.endsWith('"')) {
                            value = value.slice(1, -1).replace(/""/g, '"');
                        }
                        item[header] = value;
                    });
                    
                    // 验证必要字段
                    if (item.word && item.definition) {
                        importedData.push(item);
                        successCount++;
                    } else {
                        errorCount++;
                    }
                } catch (error) {
                    console.error(`解析第 ${i+1} 行时出错:`, error);
                    errorCount++;
                }
            }
            
            if (importedData.length > 0) {
                // 显示确认对话框
                showImportConfirmation(importedData, successCount, errorCount);
            } else {
                showNotification("未找到有效的词条数据");
            }
            
        } catch (error) {
            console.error('解析CSV文件时出错:', error);
            showNotification("解析CSV文件时出错，请检查文件格式");
        }
    };
    
    reader.onerror = function() {
        showNotification("读取文件时出错");
    };
    
    reader.readAsText(file, 'UTF-8');
}

// 解析CSV行，处理引号内的逗号
function parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];
        
        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                // 转义引号
                current += '"';
                i++; // 跳过下一个引号
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            values.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    
    values.push(current);
    return values;
}

// 显示导入确认对话框
function showImportConfirmation(importedData, successCount, errorCount) {
    // 创建确认对话框
    const confirmation = confirm(
        `找到 ${successCount} 个有效词条，${errorCount} 个错误词条\n\n` +
        `导入后将：\n` +
        `• 添加 ${importedData.length} 个新词条到当前词典\n` +
        `• 总词条数将从 ${dictionaryData.length} 增加到 ${dictionaryData.length + importedData.length}\n\n` +
        `是否确认导入？`
    );
    
    if (confirmation) {
        // 合并数据（简单的追加，不检查重复）
        const originalLength = dictionaryData.length;
        dictionaryData.push(...importedData);
        
        // 重新渲染
        if (isSearching) {
            searchWords();
        } else {
            renderDictionaryList(dictionaryData, true);
        }
        
        showNotification(`成功导入 ${importedData.length} 个词条，词典总数：${dictionaryData.length}`);
        
        // 关闭设置模态框
        closeSettingsModalFunc();
    }
}

// 处理文件选择
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 检查文件类型
    if (!file.name.toLowerCase().endsWith('.csv')) {
        showNotification("请选择CSV文件");
        return;
    }
    
    // 检查文件大小（限制为1MB）
    if (file.size > 1024 * 1024) {
        showNotification("文件大小不能超过1MB");
        return;
    }
    
    importFromCSV(file);
    
    // 重置文件输入，允许选择同一个文件再次导入
    event.target.value = '';
}
