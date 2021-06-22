function VCD_Type_Text(panel){
  const _=this;
  _.heading=panel.querySelector('.typed-heading');
  _.goDown=panel.querySelector('.go-down');
  _.interval=_.heading.dataset.interval;
  _.characters=_.heading.querySelectorAll('.character');
  _.intervalId=null;
  _.timeoutId=null

  _.type=function(){
    _.intervalId=setInterval(_.reveal,_.interval)
  }

  _.reveal=()=>{
    let prev = _.heading.getElementsByClassName('active')[0];
    if (prev){
      prev.classList.remove('active');
    }
    let next=_.heading.getElementsByClassName('hidden')[0];
    
    if (!next){
      clearInterval(_.intervalId);
      if( 'conclusion'==panel.id) return;
      const isEmbedPanel = 'embed'==panel.id;
      let downBtnDelay=600;

      if (isEmbedPanel){
        downBtnDelay=1200
      }

      _.timeoutId=window.setTimeout(()=>_.goDown.classList.add('show'),downBtnDelay);
      if (isEmbedPanel){
        window.setTimeout(()=>panel.querySelector('#compact').classList.add('show'),400);
      }
    }
    next.classList.remove('hidden');
    next.classList.add('active');
  }
}

function VCD_Observer(){
  const _ = this;
  _.panels=document.getElementsByClassName('panel');
  //_.typedHeadings=document.getElementsByClassName('typed-heading');

  _.onIntersect=function(entries){
    for (const entry of entries){
      if (entry.isIntersecting){
        const typed =  new VCD_Type_Text(entry.target);
        typed.type();
      }
    }
  }

  _.initObserver=function(){
    _.observer=new IntersectionObserver(_.onIntersect.bind(_),{
      threshold: 1.0,
    })

    for (panel of _.panels){
      _.observer.observe(panel);
    }
  }

  _.initObserver();
}

const vcdObserver=new VCD_Observer();

function VCD_Animations(){
  const _=this;
  _.embed=document.getElementById('embed');
  _.button=embed.querySelector('#compact');
  _.compactor=embed.querySelector('.compactor');
  _.timeoutId=null
  _.compactInProgress=false

  _.addListeners=function(){
    _.button.addEventListener('click',_.compact.bind(_));
  }

  _.compact=function(){
    if (_.compactInProgress) {
      return;
    }
    _.compactor.classList.add('active');
    _.compactInProgress=true;
    _.timeoutId=window.setTimeout(()=>{
      _.compactor.classList.remove('active');
      _.compactInProgress=false;
    },6000);
  }
}

const vcdAnimations=new VCD_Animations();
vcdAnimations.addListeners();