var indexCurent = 0;


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const container = $('.container');
const dashboard = $('.dashboard');
const volumeBtn = $('.volume__icon');
const volumeRange = $('.volume__value');
const rangeProcessBar = $('.range__process-bar')
const playList = $('.playlist');
const repeatBtn = $('.repeat__btn');
const prevBtn = $('.prev__btn');
const playOrPauseBtn = $('.play__pause-btn');
const nextBtn = $('.next__btn');
const shuffleBtn = $('.shuffle__btn');
const dashBoardTitle = $('.dashboard__heading h2');
const cdImg = $('.cd img');
const progress = $('.progress');
const rangeBar = $('.range__bar');
const currentMS = $('.current__time');
const durationTime = $('.duration__time');

Audio.prototype.play = (function(play) {
    return function () {
      var audio = this,
          args = arguments,
          promise = play.apply(audio, args);
      if (promise !== undefined) {
        promise.catch(_ => {
        });
      }
    };
})(Audio.prototype.play);


const app = {
    songs: [
        {
            name: 'Cá Đuối',
            singer: 'koQuet',
            path: './assest/music/song1.mp3',
            image: './assest/images/caDuoi.jpg'
        },
        {
            name: 'Tàu Biển',
            singer: 'koQuet',
            path: './assest/music/song2.mp3',
            image: './assest/images/tauBien.jpg'
        },
        {
            name: 'Con Chim',
            singer: 'Tùng',
            path: './assest/music/song3.mp3',
            image: './assest/images/conChimHatTrenCanhCay.jpg'
        },
        {
            name: 'Con Dế Mèn Hát Vào Mùa Hè',
            singer: 'Tùng',
            path: './assest/music/song4.mp3',
            image: './assest/images/conDeMen.jpg'
        },
        {
            name: 'Em Trang Trí',
            singer: 'Ngọt',
            path: './assest/music/song6.mp3',
            image: './assest/images/emTrangTri.jpg'
        },
        {
            name: 'Ở Đây Lúc Này',
            singer: 'Tùng',
            path: './assest/music/song5.mp3',
            image: './assest/images/ODayLucNay.jpg'
        },
        {
            name: 'Đường Đêm',
            singer: 'Hoàng Dũng',
            path: './assest/music/song7.mp3',
            image: './assest/images/duongDem.jpg'
        },
        {
            name: 'Xanh',
            singer: 'Ngọt',
            path: './assest/music/song8.mp3',
            image: './assest/images/xanh.jpg'
        },
        {
            name: 'Tâm Sự Tuổi 30',
            singer: 'Trịnh Thăng Bình',
            path: './assest/music/song9.mp3',
            image: './assest/images/tuoi30.jpg'
        },
        {
            name: 'Sài Gòn Buồn Quá Em Ơi',
            singer: 'Dế Mèn',
            path: './assest/music/song10.mp3',
            image: './assest/images/saiGon.jpg'
        },
        {
            name: 'Đôi Giày',
            singer: 'Koquet',
            path: './assest/music/song12.mp3',
            image: './assest/images/doiGiay.jpg'
        },
        {
            name: 'Chúng Ta Của Hiện Tại',
            singer: 'Sơn Tùng MTP',
            path: './assest/music/song13.mp3',
            image: './assest/images/chungTaCuaHienTai.png'
        },
        {
            name: 'Cuối Ngày',
            singer: 'Flob band',
            path: './assest/music/song14.mp3',
            image: './assest/images/cuoiNgay.jpg'
        },
        {
            name: 'Mặc Kệ Anh',
            singer: 'Gia ft Tín',
            path: './assest/music/song15.mp3',
            image: './assest/images/macKeAnh.jpg'
        },
        {
            name: 'Một Ngày',
            singer: 'Da LAB',
            path: './assest/music/song16.mp3',
            image: './assest/images/motNha.jpg'
        },
        {
            name: 'Nhớ',
            singer: 'Gia x The Odo',
            path: './assest/music/song17.mp3',
            image: './assest/images/nho.jpg'
        }
        
        

    ],
    scrollZoomCd: function() {
        const cd = $('.cd');
        const cdWidth = cd.offsetWidth;
        const cdHeight= cd.offsetHeight;
        const playlistHeight = playList.offsetHeight; 
        const containerHeight = container.offsetHeight;

    // Change height container
       playList.addEventListener('scroll', function(e) {
            var newCdHeight = cdHeight - Math.round(playList.scrollTop);
            var newCdWidth = cdWidth - Math.round(playList.scrollTop);

            cd.style.width = (newCdWidth > 0) ? newCdWidth + 'px' : 0;
            cd.style.height = (newCdHeight > 0) ? newCdHeight + 'px' : 0;
            cd.style.opacity = newCdWidth/cdWidth;

            var currentPlaylistHeight = (Math.round(playList.scrollTop == 0)) ? playlistHeight : playlistHeight + Math.round(playList.scrollTop)/2;
            playList.style.height =  currentPlaylistHeight + 'px';  
            container.style.height = currentPlaylistHeight + dashboard.offsetHeight + 'px';
       })
    },

    render: function() {
        var songsText = ''; 
        this.songs.forEach(function(song) {
            songsText +=
             `
                <div class="song">
                    <div class="song__info-wrap">
                        <div class="song__img">
                            <img src="${song.image}" alt="">
                        </div>
                        <div class="song__description">
                            <div class="song__description-name">
                                ${song.name}
                            </div>
                            <div class="song__description-author">
                                ${song.singer}
                            </div>
                        </div>
                    </div>
                    <div class="more__btn">
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
            `
        })

        playList.innerHTML = songsText;
    },

    start: function() {
        this.scrollZoomCd();
        this.render();
    }
}

app.start();

// Update Audio
const audio = $('#audio');
const songList = $$('.song');

function firstRender() {
    uppdateMusic(0);
    updateActive(0);
    playOrPauseBtn.innerHTML = 
        `
            <i class="play__icon fa-solid fa-circle-play"></i>
        `;

    // Prevent autoplay   
    audio.pause();
    cdImg.style.animation = '';
    playOrPauseBtn.classList.remove('active');
}

firstRender();

songList.forEach(function(song, index) {
    song.addEventListener('click', function(e) {
        indexCurent = index;
        uppdateMusic(indexCurent);
        updateActive(indexCurent);
    })
})

function uppdateMusic(index) {
    playOrPauseBtn.classList.add('active');
    repeatBtn.classList.remove('active'); 
    playOrPauseBtn.innerHTML = 
        `
            <i class="pause__icon fa-solid fa-circle-pause"></i>
        `;
    dashBoardTitle.innerText = app.songs[index].name;
    audio.src = app.songs[index].path;
    cdImg.src = app.songs[index].image;
    cdImg.style.animation = 'spin 20s linear infinite';
    rangeBar.style.width = `0`;
    audio.play();
}

function updateActive(indexSong) {
    songList.forEach(function(song, index) {
        song.classList.remove('active'); 
        if(index == indexSong) {
            song.classList.add('active'); 
        }
    })
}

// Controls Audio
function updateRangeWidth(rangeValue) {
    rangeProcessBar.style.width = `${rangeValue*0.8}px`
}

function updateVolumeIcon(rangeValue) {
    if(rangeValue > 50) {
        volumeBtn.className = "active volume__icon fa-sharp fa-solid fa-volume-high";
    } else if(rangeValue > 0 && rangeValue <=50) {
        volumeBtn.className = "active volume__icon fa-solid fa-volume-low";
    } else {
        volumeBtn.className = "volume__icon fa-solid fa-sharp fa-volume-xmark";
    }
}

function updateVolume(rangeValue) {
    audio.volume = rangeValue/100;
}

updateRangeWidth(100);

volumeRange.addEventListener('input', function() {
    const rangeValue = volumeRange.value;
    updateRangeWidth(rangeValue);
    updateVolumeIcon(rangeValue);
    updateVolume(rangeValue)
})

volumeBtn.addEventListener('click', function() {
    volumeBtn.classList.toggle('active');
    if(volumeBtn.classList.contains('active')) {
        updateVolume(100);
        volumeRange.value = 100;
        updateRangeWidth(100);
        volumeBtn.className = "active volume__icon fa-sharp fa-solid fa-volume-high";

    } else {
        updateVolume(0);
        volumeRange.value = 0;
        updateRangeWidth(0);
        volumeBtn.className = "volume__icon fa-solid fa-sharp fa-volume-xmark";
    }
})

playOrPauseBtn.addEventListener('click', function() {
    playOrPauseBtn.classList.toggle('active');
    if(playOrPauseBtn.classList.contains('active')) {
        playOrPauseBtn.innerHTML = 
        `
            <i class="pause__icon fa-solid fa-circle-pause"></i>
        `;
        audio.play();
        cdImg.style.animation = 'spin 20s linear infinite';
    } else {
        playOrPauseBtn.innerHTML = 
        `
            <i class="play__icon fa-solid fa-circle-play"></i>
        `;
        audio.pause();
        cdImg.style.animation = '';
    }
})

function nextSong() {
    if(indexCurent == app.songs.length-1) {
        indexCurent = 0;
    } else {
        indexCurent++;
    }
    
    updateActive(indexCurent);
    uppdateMusic(indexCurent);  
}

function prevSong() {
    if(indexCurent == 0) {
        indexCurent = app.songs.length-1;
    } else {
        indexCurent--;
    }
    updateActive(indexCurent);
    uppdateMusic(indexCurent);  
}

nextBtn.addEventListener('click', function(e) {
    nextSong();
})

prevBtn.addEventListener('click', function(e) {
    prevSong();
})

// Add active shuffle and remove active repeat
shuffleBtn.addEventListener('click', function(e) {
    shuffleBtn.classList.toggle('active');

    if(repeatBtn.classList.contains('active')) {
        repeatBtn.classList.remove('active');
        audio.loop = false;
    }  
})

function checkLoop() {
    if(repeatBtn.classList.contains('active')) {
        audio.loop = true;
    } else {
        audio.loop = false;
    }
}

// Add active repeat and remove active shuffle 
repeatBtn.addEventListener('click', function(e) {
    if(shuffleBtn.classList.contains('active')) {
        shuffleBtn.classList.remove('active');
    }  
    repeatBtn.classList.toggle('active');
    checkLoop();
})

function updateRangeBar(currentTime) {
    const dv = (progress.offsetWidth-9)/audio.duration;
    rangeBar.style.width = `${currentTime*dv}px`;
}

progress.addEventListener('input', function(e) {
    if(audio.duration) {
        audio.currentTime = progress.value;
        updateRangeBar(audio.currentTime);
    } 
})

//  Render progess, current time  and next song
audio.ontimeupdate = function() {
    if(audio.duration) {
        const currentTimeAudio = Math.floor(audio.currentTime);
        progress.value = currentTimeAudio;

        updateRangeBar(currentTimeAudio);

        const minute = Math.floor(currentTimeAudio/60);
        const second = Math.floor((currentTimeAudio/60 - minute)*60);

        if(second < 10) {
            currentMS.innerText = `${minute}:0${second}`;
        } else {
            currentMS.innerText = `${minute}:${second}`;
        }
    }
    
    // Shuffle songs and next songs at the end of the sound
    if(progress.value == Math.floor(audio.duration) && shuffleBtn.classList.contains('active') && audio.loop == false) {
        const temp = indexCurent;
        do {
            indexCurent = Math.floor(Math.random()*app.songs.length);
        } while(indexCurent == temp);

        uppdateMusic(indexCurent);
        updateActive(indexCurent);
        checkLoop()
    } else if(progress.value == Math.floor(audio.duration) && audio.loop == false)  {
        nextSong();
        checkLoop()
    }     
}

// Render duration
audio.onloadedmetadata = function() {
    const durationAudio = Math.floor(audio.duration);
    const minute = Math.floor(durationAudio/60).toString();
    const second = Math.floor((durationAudio/60 - minute)*60).toString();

    progress.max = Math.floor(audio.duration); 
    
    if(JSON.parse(second) < 10) {
       var newSecond = '0' + second;
       durationTime.innerText = `${minute}:${newSecond}`;
    } else {
        durationTime.innerText = `${minute}:${second}`;
    }
};


