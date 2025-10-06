// Instagram Highlight Stories System
// Usage: const highlights = new InstagramHighlights('#highlight-container', highlightsData);

class InstagramHighlights {
    constructor(containerSelector, data) {
        this.container = $(containerSelector);
        this.data = data;
        this.currentHighlight = null;
        this.currentStoryIndex = 0;
        this.progressInterval = null;
        this.storyTimeout = null;

        this.init();
    }

    init() {
        this.injectStyles();
        this.createStoryViewer();
        this.renderHighlights();
        this.attachEvents();
    }

    injectStyles() {
        const styles = `
            <style id="ig-highlights-styles">
                .ig-highlight-container {
                    display: flex;
                    gap: 20px;
                    overflow-x: auto;
                    padding: 16px 0;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }

                .ig-highlight-container::-webkit-scrollbar {
                    display: none;
                }

                .ig-highlight-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    cursor: pointer;
                    flex-shrink: 0;
                    transition: transform 0.1s;
                }

                .ig-highlight-item:active {
                    transform: scale(0.95);
                }

                .ig-highlight-ring {
                    padding: 2px;
                    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
                    border-radius: 50%;
                }

                .ig-highlight-ring-inner {
                    background: #000;
                    border-radius: 50%;
                    padding: 3px;
                }

                .ig-highlight-avatar {
                    width: 77px;
                    height: 77px;
                    border-radius: 50%;
                    object-fit: cover;
                    display: block;
                    background: #262626;
                }

                .ig-highlight-label {
                    font-size: 12px;
                    color: #fff;
                    margin-top: 8px;
                    text-align: center;
                    max-width: 85px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                #ig-story-viewer {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #000;
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    opacity: 0;
                    transition: opacity 0.2s;
                }

                #ig-story-viewer.show {
                    opacity: 1;
                }

                #ig-story-viewer.hidden {
                    display: none;
                }

                .ig-story-progress {
                    display: flex;
                    gap: 4px;
                    padding: 8px 12px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 10;
                }

                .ig-progress-bar {
                    flex: 1;
                    height: 2px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 1px;
                    overflow: hidden;
                }

                .ig-progress-fill {
                    height: 100%;
                    background: #fff;
                    width: 0;
                    transition: width 0.1s linear;
                }

                .ig-story-header {
                    display: flex;
                    align-items: center;
                    padding: 16px 12px 12px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 10;
                    margin-top: 20px;
                }

                .ig-story-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    margin-right: 10px;
                    object-fit: cover;
                    border: 2px solid #fff;
                }

                .ig-story-username {
                    color: #fff;
                    font-size: 14px;
                    font-weight: 600;
                    flex: 1;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                }

                .ig-story-close {
                    background: none;
                    border: none;
                    color: #fff;
                    font-size: 28px;
                    cursor: pointer;
                    padding: 0;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .ig-story-content {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }

                .ig-story-media {
                    max-width: 100%;
                    max-height: 100%;
                    width: auto;
                    height: auto;
                    object-fit: contain;
                }

                .ig-story-text-overlay {
                    position: absolute;
                    bottom: 80px;
                    left: 20px;
                    right: 20px;
                    color: #fff;
                    font-size: 14px;
                    line-height: 1.4;
                    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                }

                .ig-story-nav {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 50%;
                    z-index: 5;
                    cursor: pointer;
                }

                .ig-story-nav.prev {
                    left: 0;
                }

                .ig-story-nav.next {
                    right: 0;
                }

                .ig-story-actions {
                    padding: 16px;
                    display: flex;
                    gap: 12px;
                    align-items: center;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                }

                .ig-story-input {
                    flex: 1;
                    background: none;
                    border: 1px solid rgba(255, 255, 255, 0.5);
                    border-radius: 22px;
                    padding: 12px 16px;
                    color: #fff;
                    font-size: 14px;
                    outline: none;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                }

                .ig-story-input::placeholder {
                    color: rgba(255, 255, 255, 0.6);
                }

                .ig-story-action-btn {
                    background: none;
                    border: none;
                    color: #fff;
                    font-size: 20px;
                    cursor: pointer;
                    padding: 8px;
                }
            </style>
        `;

        if (!$('#ig-highlights-styles').length) {
            $('head').append(styles);
        }
    }

    createStoryViewer() {
        if ($('#ig-story-viewer').length) return;

        const viewerHTML = `
            <div id="ig-story-viewer" class="hidden">
                <div class="ig-story-progress" id="ig-progress-bars"></div>
                
                <div class="ig-story-header">
                    <img src="" class="ig-story-avatar" id="ig-story-avatar" alt="">
                    <span class="ig-story-username" id="ig-story-username"></span>
                    <button class="ig-story-close" id="ig-close-story">×</button>
                </div>

                <div class="ig-story-nav prev" id="ig-prev-story"></div>
                <div class="ig-story-nav next" id="ig-next-story"></div>

                <div class="ig-story-content" id="ig-story-content"></div>

                <div class="ig-story-actions">
                    <input type="text" class="ig-story-input" placeholder="ส่งข้อความ" readonly>
                    <button class="ig-story-action-btn"><i class="far fa-heart"></i></button>
                    <button class="ig-story-action-btn"><i class="far fa-paper-plane"></i></button>
                </div>
            </div>
        `;

        $('body').append(viewerHTML);
    }

    renderHighlights() {
        this.container.addClass('ig-highlight-container');
        this.container.empty();

        this.data.forEach((highlight) => {
            const html = `
                <div class="ig-highlight-item" data-id="${highlight.id}">
                    <div class="ig-highlight-ring">
                        <div class="ig-highlight-ring-inner">
                            <img src="${highlight.avatar}" 
                                class="ig-highlight-avatar"
                                draggable="false"
                                alt="${highlight.title}">
                        </div>
                    </div>
                    <span class="ig-highlight-label">${highlight.title}</span>
                </div>
            `;
            this.container.append(html);
        });
    }

    attachEvents() {
        const self = this;

        // Click highlight to open
        this.container.on('click', '.ig-highlight-item', function () {
            const id = $(this).data('id');
            self.openStory(id);
        });

        // Close story
        $(document).on('click', '#ig-close-story', () => this.closeStory());

        // Navigation
        $(document).on('click', '#ig-next-story', () => this.nextStory());
        $(document).on('click', '#ig-prev-story', () => this.prevStory());

        // Keyboard navigation
        $(document).on('keydown', (e) => {
            if (!$('#ig-story-viewer').hasClass('hidden')) {
                if (e.key === 'Escape') this.closeStory();
                if (e.key === 'ArrowRight') this.nextStory();
                if (e.key === 'ArrowLeft') this.prevStory();
            }
        });
    }

    openStory(highlightId) {
        this.currentHighlight = this.data.find(h => h.id === highlightId);
        if (!this.currentHighlight) return;

        this.currentStoryIndex = 0;
        $('#ig-story-viewer').removeClass('hidden').addClass('show');
        $('body').css('overflow', 'hidden');

        this.showStory();
    }

    showStory() {
        if (!this.currentHighlight || this.currentStoryIndex >= this.currentHighlight.stories.length) {
            this.closeStory();
            return;
        }

        const story = this.currentHighlight.stories[this.currentStoryIndex];

        // Update header
        $('#ig-story-avatar').attr('src', this.currentHighlight.avatar);
        $('#ig-story-username').text(this.currentHighlight.title);

        // Create progress bars
        const progressHTML = this.currentHighlight.stories.map((_, i) => `
            <div class="ig-progress-bar">
                <div class="ig-progress-fill" data-index="${i}"></div>
            </div>
        `).join('');
        $('#ig-progress-bars').html(progressHTML);

        // Fill previous bars
        for (let i = 0; i < this.currentStoryIndex; i++) {
            $(`.ig-progress-fill[data-index="${i}"]`).css('width', '100%');
        }

        // Load content
        const content = $('#ig-story-content');
        content.empty();

        if (story.type === 'image') {
            const img = $(`<img src="${story.url}" class="ig-story-media" alt="">`);
            content.append(img);

            img.on('load', () => {
                this.startProgress(story.duration);
            });
        } else if (story.type === 'video') {
            const video = $(`
                <video class="ig-story-media" autoplay muted>
                    <source src="${story.url}" type="video/mp4">
                </video>
            `);
            content.append(video);

            video.on('loadeddata', () => {
                const duration = video[0].duration * 1000 || story.duration;
                this.startProgress(duration);
            });
        }

        // Add text overlay
        if (story.text) {
            content.append(`<div class="ig-story-text-overlay">${story.text}</div>`);
        }
    }

    startProgress(duration) {
        clearInterval(this.progressInterval);
        clearTimeout(this.storyTimeout);

        const fill = $(`.ig-progress-fill[data-index="${this.currentStoryIndex}"]`);
        let progress = 0;
        const increment = 100 / (duration / 50);

        this.progressInterval = setInterval(() => {
            progress += increment;
            fill.css('width', Math.min(progress, 100) + '%');

            if (progress >= 100) {
                clearInterval(this.progressInterval);
            }
        }, 50);

        this.storyTimeout = setTimeout(() => {
            this.nextStory();
        }, duration);
    }

    nextStory() {
        this.currentStoryIndex++;
        if (this.currentStoryIndex >= this.currentHighlight.stories.length) {
            this.closeStory();
        } else {
            this.showStory();
        }
    }

    prevStory() {
        if (this.currentStoryIndex > 0) {
            this.currentStoryIndex--;
            this.showStory();
        } else {
            this.closeStory();
        }
    }

    closeStory() {
        clearInterval(this.progressInterval);
        clearTimeout(this.storyTimeout);

        $('#ig-story-viewer').removeClass('show');
        setTimeout(() => {
            $('#ig-story-viewer').addClass('hidden');
            $('#ig-story-content').empty();
            $('body').css('overflow', '');
        }, 200);
    }

    // Public methods
    addHighlight(highlight) {
        this.data.push(highlight);
        this.renderHighlights();
    }

    removeHighlight(id) {
        this.data = this.data.filter(h => h.id !== id);
        this.renderHighlights();
    }

    updateData(newData) {
        this.data = newData;
        this.renderHighlights();
    }

    destroy() {
        clearInterval(this.progressInterval);
        clearTimeout(this.storyTimeout);
        $(document).off('click', '#ig-close-story');
        $(document).off('click', '#ig-next-story');
        $(document).off('click', '#ig-prev-story');
        $(document).off('keydown');
        this.container.off('click');
        $('#ig-story-viewer').remove();
        $('#ig-highlights-styles').remove();
    }
}

// ตัวอย่างการใช้งาน:


// ข้อมูล Highlights
const highlightsData = [
    {
        id: 'myProjects',
        title: 'My Projects',
        image: '/images/img/noitems.svg',
        content: {
            title: 'My Projects',
            body: `
                        <div class="content-container">
                            <img src="https://picsum.photos/400/300?random=1" 
                                alt="My project preview"
                                class="content-image">
                            <video controls class="content-video">
                                <source src="/images/Video/sample.mp4" type="video/mp4">
                                Your browser does not support video playback.
                            </video>
                            <p class="content-text">โปรเจกต์ตัวอย่างจาก Centered101</p>
                        </div>
                    `
        }
    },
    {
        id: 'behind',
        title: 'Behind',
        image: '/images/img/noitems.svg',
        content: {
            title: 'Behind the Scenes',
            body: `
                        <div class="content-container">
                            <img src="https://picsum.photos/400/300?random=2" class="content-image">
                            <p class="content-text">เบื้องหลังการทำเว็บและระบบต่าง ๆ</p>
                        </div>
                    `
        }
    },
    {
        id: 'repository',
        title: 'Repository',
        image: '/images/img/noitems.svg',
        content: {
            title: 'Repository',
            body: `
                        <div class="content-container">
                            <div class="grid-images">
                                <img src="https://picsum.photos/200/200?random=3" class="content-image">
                                <img src="https://picsum.photos/200/200?random=4" class="content-image">
                            </div>
                            <p class="content-text">รวมภาพจาก repository ล่าสุด</p>
                        </div>
                    `
        }
    },
    {
        id: 'favTracks',
        title: 'Fav Tracks',
        image: '/images/img/noitems.svg',
        content: {
            title: 'Favorite Tracks',
            body: `
                        <div class="content-container">
                            <div class="audio-container">
                                <img src="https://picsum.photos/160/160?random=5" class="audio-cover">
                                <audio controls>
                                    <source src="/Audio/sample.mp3" type="audio/mpeg">
                                    Your browser does not support audio playback.
                                </audio>
                                <p class="content-text">เพลงที่ชอบที่สุดตอนนี้</p>
                            </div>
                        </div>
                    `
        }
    }
];

// 2. สร้าง Instance
const myHighlights = new InstagramHighlights('#highlight', highlightsData);

// 3. เพิ่ม Highlight ใหม่
myHighlights.addHighlight({
    id: 'newStory',
    title: 'New Story',
    avatar: '/images/avatar3.jpg',
    stories: [
        {
            type: 'image',
            url: '/images/new.jpg',
            duration: 5000,
            text: 'Story ใหม่!'
        }
    ]
});

// 4. ลบ Highlight
myHighlights.removeHighlight('behind');

// 5. Update ข้อมูลทั้งหมด
myHighlights.updateData(newHighlightsData);

// 6. ทำลาย Instance
myHighlights.destroy();

