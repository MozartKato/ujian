import katex from 'katex';

export function renderMath(text) {
  if (!text) return '';
  
  let html = text;
  
  // Process display math first ($$...$$)
  html = html.replace(/\$\$([^$]+)\$\$/g, (match, math) => {
    try {
      return katex.renderToString(math, { displayMode: true, throwOnError: false });
    } catch (e) {
      return match;
    }
  });
  
  // Process inline math ($...$)
  html = html.replace(/\$([^$]+)\$/g, (match, math) => {
    try {
      return katex.renderToString(math, { displayMode: false, throwOnError: false });
    } catch (e) {
      return match;
    }
  });
  
  return html;
}

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatQuestionCount(count) {
  if (count > 10000) {
    return '10000+ soal tersedia';
  }
  return `${count} soal tersedia`;
}

export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
