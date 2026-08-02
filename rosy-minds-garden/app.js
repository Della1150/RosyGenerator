"use strict";

const STORAGE_KEY = "rosyMindsGardenV1";
const MAX_BLESSINGS = 30;

const moments = [
  ["Held Before the Day Begins","Isaiah 41:10","God is with you; you do not have to be afraid.","Before the first demand reaches you, God’s presence already has. You are not walking into this day alone.","Jesus, steady my heart and help me notice that You are near.","Take three slow breaths and quietly say, “God is with me.”"],
  ["New Mercy Is Already Here","Lamentations 3:22–23","His mercies are new every morning.","Yesterday does not get the final word. Today arrives carrying fresh mercy, fresh help, and another chance to begin with God.","Lord, thank You for mercy that meets me right where I am.","Release one mistake from yesterday instead of replaying it."],
  ["Peace for the Next Step","Proverbs 3:5–6","Trust God, and He will direct your path.","You do not need the entire map. Faith often looks like trusting Jesus with the next faithful step.","Guide me, Lord. Make my next step clear and my heart willing.","Do one small thing you have been postponing."],
  ["A Quiet Place for Your Heart","Psalm 46:10","Be still, and know that He is God.","Stillness is not doing nothing. It is making room to remember who God is when life feels loud.","Jesus, quiet the noise within me and help me rest in You.","Sit in silence for one full minute without fixing anything."],
  ["Grace Is Growing Here","2 Corinthians 12:9","God’s grace is sufficient for you.","Weakness does not disqualify you from being used by God. It can become the very place where His strength becomes visible.","Lord, meet me in the places where I feel small today.","Name one area where you need grace instead of pressure."],
  ["Joy Can Visit Ordinary Days","Psalm 118:24","This is the day the Lord has made.","Joy is not reserved for perfect circumstances. It can bloom in a kitchen, a car ride, a phone call, or one grateful thought.","Thank You, Jesus, for the gift hidden inside this ordinary day.","Notice and name one small delight before noon."],
  ["Your Prayers Are Not Lost","Psalm 34:17","The Lord hears when His people cry out.","A quiet prayer is still heard. A tearful prayer is still prayer. Heaven does not overlook the words you can barely say.","Lord, receive the prayer I have carried silently.","Write one sentence to God about what is truly on your heart."],
  ["Rest Is an Act of Trust","Matthew 11:28","Jesus invites the weary to come and rest.","You were never meant to carry every burden without pause. Rest can be a holy way of admitting that God is God and you are loved.","Jesus, teach me to receive rest without guilt.","Give yourself ten unhurried minutes today."],
  ["The Shepherd Still Leads","Psalm 23:1–3","The Lord is your shepherd and restores your soul.","Even when you cannot see far ahead, the Shepherd can. His pace is patient, His direction is wise, and His care is personal.","Lead me gently today, Lord, and restore what feels worn.","Choose peace over hurry in one moment today."],
  ["Hope Has Not Left the Room","Romans 15:13","God fills His people with hope through faith.","Hope is not pretending everything is easy. It is believing God is still present and still working in what you cannot yet understand.","God of hope, fill the empty places in me again.","Send an encouraging message to someone who may need hope."],
  ["You Are Seen","Genesis 16:13","God is the One who sees you.","The work no one applauds, the worry no one notices, and the kindness no one remembers are all seen by God.","Thank You, Lord, for seeing the whole of me with love.","Do one unseen act of kindness without needing credit."],
  ["Courage Can Be Gentle","Joshua 1:9","Be strong and courageous, for God is with you.","Courage is not always loud. Sometimes it is a soft yes, a healthy boundary, an honest conversation, or getting up one more time.","Jesus, give me quiet courage for what today requires.","Take one brave but loving action."],
  ["God Is Working in the Waiting","Psalm 27:14","Wait on the Lord and let your heart be strengthened.","Waiting is not wasted when God is in it. Roots grow in hidden places before anything beautiful appears above ground.","Strengthen my heart while I wait, Lord.","Replace one anxious check with a short prayer."],
  ["A Fountain of Peace","John 14:27","Jesus gives a peace the world cannot give.","Christ’s peace is deeper than a calm schedule. It can remain even while questions are unanswered.","Jesus, let Your peace settle over my thoughts and choices.","Turn off one source of noise for thirty minutes."],
  ["Love Is Today’s Best Work","1 Corinthians 16:14","Let everything you do be done with love.","A loving tone, a patient pause, and a sincere word can become sacred work in an ordinary day.","Lord, let love shape my words before I speak them.","Offer one specific compliment today."],
  ["Your Story Still Has Light","John 8:12","Jesus is the light of the world.","Dark chapters do not erase the Author. Christ can bring direction, warmth, and meaning into places that once felt hopeless.","Jesus, shine into the part of my story that needs light.","Open the curtains or step outside and thank God for light."],
  ["The Sparrow Reminder","Matthew 10:29–31","You are valuable to God, who watches over the sparrows.","The God who notices a small bird has not forgotten you. His attention is not divided, and His care is not distant.","Father, help me live today as someone deeply cared for.","Pause when you see a bird and remember that God sees you."],
  ["Enough Strength for Today","Deuteronomy 33:25","Your strength will match your days.","You may not have strength for next month, but you do not need it yet. God gives grace in daily portions.","Lord, give me the strength needed for this day—not every day at once.","Break one overwhelming task into its smallest next step."],
  ["Kind Words Plant Flowers","Proverbs 16:24","Gracious words are sweet and healing.","Words can leave a fragrance long after a conversation ends. With God’s help, your voice can become a place of safety.","Jesus, make my words gentle, truthful, and healing.","Speak kindly to yourself at least once today."],
  ["Nothing Is Too Small for Prayer","Philippians 4:6","Bring everything to God in prayer.","There is no concern too ordinary, too repetitive, or too small to place in God’s hands.","Father, I bring You the little things I usually carry alone.","Pray about one practical concern you normally dismiss."],
  ["Rooted, Not Rushed","Colossians 2:7","Be rooted and built up in Christ.","Deep growth often looks slow from the surface. God is more interested in strong roots than quick appearances.","Root me in Your truth, Jesus, and free me from comparison.","Read one verse twice, slowly."],
  ["The Chapel in the Garden","Psalm 84:10","One day in God’s presence is better than thousands elsewhere.","God’s presence can turn any room into holy ground. You do not have to wait for a perfect setting to meet with Him.","Lord, make my heart a welcoming place for Your presence.","Create a tiny prayer corner with a Bible, chair, or candle."],
  ["God Can Carry the Heavy Part","1 Peter 5:7","Cast your cares on Him because He cares for you.","Handing God a burden does not mean you never feel it again. It means you no longer have to hold it alone.","Jesus, I place this weight into Your capable hands.","Write your biggest worry, then place the paper inside your Bible."],
  ["Gratitude Opens the Gate","1 Thessalonians 5:18","Give thanks in every circumstance.","Gratitude does not deny what hurts. It reminds the heart that pain is not the only thing present.","Thank You, Lord, for the goodness that remains beside the struggle.","List three blessings: one large, one small, and one still becoming."],
  ["A Soft Answer Is Strong","Proverbs 15:1","A gentle answer turns away anger.","Gentleness is not weakness. It is strength that has chosen not to wound.","Jesus, place wisdom between my feelings and my response.","Pause for five seconds before answering something difficult."],
  ["The Door Is Still Open","Revelation 3:20","Jesus stands at the door and knocks.","Christ does not force His way into the hurried places of your life. He lovingly invites you to open the door again.","Jesus, You are welcome in my plans, emotions, and decisions.","Invite God into one area you have been managing alone."],
  ["Beauty from the Broken Pieces","Romans 8:28","God works through all things for good.","God does not call every painful thing good, but He is able to weave redemption through what was never meant to break you.","Redeem what I cannot repair by myself, Lord.","Name one lesson God has grown from a difficult season."],
  ["The Garden Is Not Finished","Philippians 1:6","God will complete the good work He began.","You are not a failed finished product. You are a living work of grace, still being shaped by faithful hands.","Thank You for not giving up on me, Jesus.","Replace “I should be farther” with “God is still working.”"],
  ["Morning Light After a Long Night","Psalm 30:5","Weeping may endure for a night, but joy comes.","Some nights last longer than expected, yet they do not last forever. God remains present until morning finds you.","Hold me through the night season and help me recognize new light.","Do one hopeful thing for your future self."],
  ["A Garden Full of Grace","Ephesians 3:20","God is able to do more than we can imagine.","Look at how many small moments have become a garden. Faithfulness is often built one quiet visit at a time.","Jesus, thank You for every seed of faith You have helped me tend.","Celebrate your growth without minimizing it."],
];

const blessings = [
  ["Rose of Hope","🌹","Hope can bloom again, even after a difficult season."],
  ["Lily of Peace","🌷","Christ’s peace can settle where worry once lived."],
  ["Joyful Daisy","🌼","God still places bright moments in ordinary days."],
  ["Grace Butterfly","🦋","Grace is changing you gently, not rushing you."],
  ["Faithful Sparrow","🐦","You are seen, valued, and cared for by God."],
  ["Promise Lantern","🏮","God’s promises give enough light for the next step."],
  ["Mercy Morning","🌤️","Today arrived carrying brand-new mercy."],
  ["Kindness Violet","💜","Small kindness can leave a beautiful fragrance."],
  ["Prayer Pearl","🤍","No sincere prayer is ever wasted."],
  ["Courage Poppy","🌺","Gentle courage is still courage."],
  ["Resting Dove","🕊️","You may rest because God remains awake."],
  ["Gratitude Bloom","🌻","Thankfulness helps the heart see what fear overlooks."],
  ["Shepherd’s Path","🐑","Jesus knows the way, even when you do not."],
  ["Living Water","⛲","God can refresh the places that feel dry."],
  ["Love Petal","💗","Love is never a small assignment."],
  ["Light of Christ","✨","Darkness cannot overcome the light Jesus brings."],
  ["Quiet Strength","🌿","God can make you steady without making you hard."],
  ["Waiting Seed","🌱","Hidden seasons can still be growing seasons."],
  ["Healing Honeybee","🐝","Healing often happens through many small mercies."],
  ["Trusting Teacup","☕","Peace grows when control is placed back in God’s hands."],
  ["Rooted Fern","🌿","Deep roots matter more than quick appearances."],
  ["Garden Chapel","⛪","God’s presence can meet you anywhere."],
  ["Burden Basket","🧺","You do not have to carry every weight alone."],
  ["Thankful Gate","🚪","Gratitude opens the heart to notice grace."],
  ["Gentle Answer","🪻","A soft response can be stronger than a sharp one."],
  ["Open Door","🗝️","Jesus is welcome in every room of your life."],
  ["Mended Mosaic","💐","God can create beauty from broken pieces."],
  ["Becoming Blossom","🌸","You are still becoming who God created you to be."],
  ["Morning Star","⭐","Long nights do not cancel the promise of morning."],
  ["Crown of Grace","👑","Your garden is proof that small faithful moments matter."],
];

const quizzes = [
  ["Who built the ark?",["Moses","Noah","David"],1,"Genesis 6 tells how Noah obeyed God and built the ark."],
  ["Who was swallowed by a great fish?",["Jonah","Peter","Joseph"],0,"Jonah’s story reminds us that God can redirect us with mercy."],
  ["Where was Jesus born?",["Nazareth","Bethlehem","Jerusalem"],1,"Jesus was born in Bethlehem, fulfilling prophecy."],
  ["Who defeated Goliath?",["David","Samuel","Solomon"],0,"Young David trusted God more than he feared the giant."],
  ["What did Jesus calm?",["A storm","A crowd","A fire"],0,"Jesus spoke peace to the wind and waves."],
  ["Who received the Ten Commandments?",["Abraham","Moses","Joshua"],1,"Moses received the commandments on Mount Sinai."],
  ["What is the first book of the Bible?",["Psalms","Matthew","Genesis"],2,"Genesis means beginning and opens the story of creation."],
  ["Who was known for great wisdom?",["Solomon","Samson","Andrew"],0,"Solomon asked God for wisdom to lead well."],
  ["Who climbed a tree to see Jesus?",["Zacchaeus","Thomas","Philip"],0,"Jesus noticed Zacchaeus and called him by name."],
  ["How many disciples did Jesus choose?",["Seven","Twelve","Forty"],1,"Jesus chose twelve disciples to learn from and follow Him."],
  ["Who interpreted Pharaoh’s dreams?",["Joseph","Isaac","Elijah"],0,"God gave Joseph wisdom that helped save many lives."],
  ["What did Jesus multiply to feed a crowd?",["Bread and fish","Figs and water","Grain and oil"],0,"Jesus used a small offering to feed thousands."],
  ["Who was Jesus’ mother?",["Martha","Mary","Elizabeth"],1,"Mary trusted God’s extraordinary plan with humble faith."],
  ["Which disciple walked on water toward Jesus?",["John","Peter","James"],1,"Peter stepped out of the boat when Jesus called him."],
  ["What did God create on the first day?",["Light","Animals","People"],0,"Genesis begins with God calling light into the darkness."],
];

const $ = (id) => document.getElementById(id);
const today = new Date();
const todayKey = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
const dayNumber = Math.floor(new Date(today.getFullYear(),today.getMonth(),today.getDate()).getTime()/86400000);
const momentIndex = ((dayNumber % moments.length) + moments.length) % moments.length;
let selectedPetal = "Hope";
let quizSolved = false;
let deferredInstallPrompt = null;

function loadState(){
  try{
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      completed: Array.isArray(saved?.completed) ? saved.completed : [],
      collected: Array.isArray(saved?.collected) ? saved.collected.slice(0,MAX_BLESSINGS) : [],
      petals: saved?.petals && typeof saved.petals === "object" ? saved.petals : {}
    };
  }catch{return {completed:[],collected:[],petals:{}};}
}
let state = loadState();

function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
function isCompleteToday(){return state.completed.includes(todayKey);}
function formatDate(){return today.toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"});}

function renderGarden(){
  const count = Math.min(state.collected.length,MAX_BLESSINGS);
  $("visitCount").textContent = state.completed.length;
  $("bloomCount").textContent = count;
  $("progressFill").style.width = `${count/MAX_BLESSINGS*100}%`;
  $("flowerBed").innerHTML = "";
  const flowerIcons = ["🌹","🌷","🌼","🌸","🪻","🌻"];
  for(let i=0;i<count;i++){
    const flower=document.createElement("span");
    flower.className="flower";
    flower.textContent=flowerIcons[i%flowerIcons.length];
    const col=i%10,row=Math.floor(i/10);
    flower.style.left=`${4+col*9.5}%`;
    flower.style.bottom=`${12+row*10+(col%2)*3}%`;
    flower.style.animationDelay=`${Math.min(i*35,650)}ms`;
    $("flowerBed").appendChild(flower);
  }
  document.querySelector(".butterfly-one").classList.toggle("visible",count>=7);
  document.querySelector(".butterfly-two").classList.toggle("visible",count>=10);
  document.querySelector(".fountain").classList.toggle("visible",count>=14);
  document.querySelector(".sparrow").classList.toggle("visible",count>=21);
  document.querySelector(".chapel").classList.toggle("visible",count>=30);
  const level = count>=30?"Grace Garden Complete":count>=21?"Flourishing Garden":count>=14?"Peaceful Garden":count>=7?"Growing Garden":"Seedling Garden";
  $("gardenLevel").textContent=level;
  if(count===0) $("gardenMessage").textContent="Your first flower is waiting.";
  else if(count<7) $("gardenMessage").textContent="Your garden has begun to bloom.";
  else if(count<14) $("gardenMessage").textContent="Butterflies have found your garden.";
  else if(count<21) $("gardenMessage").textContent="The fountain of peace is flowing.";
  else if(count<30) $("gardenMessage").textContent="A faithful sparrow has come to visit.";
  else $("gardenMessage").textContent="Your little chapel garden is full of grace.";
  const milestones=[[7,"butterflies"],[14,"the fountain"],[21,"the faithful sparrow"],[30,"the garden chapel"]];
  const next=milestones.find(([n])=>count<n);
  $("nextMilestone").textContent=next?`Next: unlock ${next[1]} at ${next[0]}`:"All garden milestones unlocked";
}

function renderCollection(){
  const grid=$("collectionGrid");
  grid.innerHTML="";
  for(let i=0;i<MAX_BLESSINGS;i++){
    const unlocked=state.collected.includes(i);
    const item=document.createElement("div");
    item.className=`collection-item ${unlocked?"unlocked":"locked"}`;
    item.title=unlocked?blessings[i][0]:`Blessing ${i+1} is waiting`;
    item.setAttribute("aria-label",item.title);
    item.innerHTML=unlocked?`<span>${blessings[i][1]}</span><span>${i+1}</span>`:`<span>•</span><span>${i+1}</span>`;
    grid.appendChild(item);
  }
}

function fillMoment(petal=selectedPetal){
  selectedPetal=petal;
  const [title,ref,scripture,reflection,prayer,challenge]=moments[momentIndex];
  const petalIcon={Hope:"🌹",Peace:"🌸",Joy:"🌼"}[petal];
  $("chosenPetal").textContent=`${petalIcon} ${petal}`;
  $("scriptureRef").textContent=ref;
  $("promiseTitle").textContent=title;
  $("promiseText").textContent=scripture;
  const petalLead={Hope:"Hope reminds us that God is still writing.",Peace:"Peace reminds us that God is present in the middle.",Joy:"Joy reminds us to notice God’s goodness today."}[petal];
  $("reflectionText").textContent=`${petalLead} ${reflection}`;
  $("prayerText").textContent=prayer;
  $("challengeText").textContent=challenge;
  renderQuiz();
  $("petalPicker").hidden=true;
  $("momentContent").hidden=false;
}

function renderQuiz(){
  const [question,options,answer,explanation]=quizzes[momentIndex%quizzes.length];
  $("quizQuestion").textContent=question;
  $("quizFeedback").textContent="";
  $("quizOptions").innerHTML="";
  quizSolved=false;
  $("waterButton").disabled=true;
  $("waterButton").textContent=isCompleteToday()?"✓ Garden Tended Today":"💧 Water My Garden";
  $("waterHint").textContent=isCompleteToday()?"Your blessing has already been collected today.":"Answer the Bible question to water your garden.";
  options.forEach((option,index)=>{
    const button=document.createElement("button");
    button.type="button";
    button.className="quiz-option";
    button.textContent=option;
    button.addEventListener("click",()=>{
      if(quizSolved)return;
      if(index===answer){
        quizSolved=true;
        button.classList.add("correct");
        [...$("quizOptions").children].forEach(b=>b.disabled=true);
        $("quizFeedback").textContent=`That’s right! ${explanation}`;
        if(!isCompleteToday()){
          $("waterButton").disabled=false;
          $("waterHint").textContent="Beautiful—your garden is ready for today’s water.";
        }
      }else{
        button.classList.add("incorrect");
        button.disabled=true;
        $("quizFeedback").textContent="Not quite. Try another answer—this garden always makes room for learning.";
      }
    });
    $("quizOptions").appendChild(button);
  });
}

function showReward(index){
  const [name,icon,message]=blessings[index];
  $("rewardIcon").textContent=icon;
  $("rewardTitle").textContent=name;
  $("rewardMessage").textContent=message;
  $("rewardModal").hidden=false;
  document.body.classList.add("modal-open");
  $("gardenScene").classList.add("celebrating");
  setTimeout(()=>$("gardenScene").classList.remove("celebrating"),1800);
}
function closeReward(){
  $("rewardModal").hidden=true;
  document.body.classList.remove("modal-open");
}

function waterGarden(){
  if(isCompleteToday()||!quizSolved)return;
  state.completed.push(todayKey);
  state.petals[todayKey]=selectedPetal;
  let rewardIndex=Math.min(state.collected.length,MAX_BLESSINGS-1);
  if(state.collected.length<MAX_BLESSINGS) state.collected.push(rewardIndex);
  saveState();
  renderGarden();
  renderCollection();
  $("completionBadge").hidden=false;
  $("waterButton").disabled=true;
  $("waterButton").textContent="✓ Garden Tended Today";
  $("waterHint").textContent="Come back tomorrow for another moment with Jesus.";
  showReward(rewardIndex);
}

function shareText(){
  const count=state.collected.length;
  const latest=count?blessings[Math.min(count-1,MAX_BLESSINGS-1)]:null;
  return latest?`Today I collected the ${latest[0]} in ROSY MINDS GARDEN. ${latest[2]} 🌹 A Daily Moment with Jesus.`:`Come spend one gentle minute with Jesus in ROSY MINDS GARDEN. 🌹`;
}
async function shareGarden(){
  const data={title:"ROSY MINDS GARDEN",text:shareText(),url:location.href};
  try{
    if(navigator.share){await navigator.share(data);}
    else{await navigator.clipboard.writeText(`${data.text}\n${data.url}`);$("shareStatus").textContent="The garden message and link were copied.";}
  }catch(error){if(error?.name!=="AbortError") $("shareStatus").textContent="Use your browser’s Share button to send this garden to a friend.";}
}

function renderDailyState(){
  $("todayDate").textContent=formatDate();
  if(isCompleteToday()){
    $("completionBadge").hidden=false;
    $("petalPicker").hidden=true;
    $("momentContent").hidden=true;
    $("alreadyComplete").hidden=false;
  }else{
    $("completionBadge").hidden=true;
    $("petalPicker").hidden=false;
    $("momentContent").hidden=true;
    $("alreadyComplete").hidden=true;
  }
}

function reviewToday(){
  $("alreadyComplete").hidden=true;
  fillMoment(state.petals[todayKey]||"Hope");
}

function resetGarden(){
  if(!confirm("Reset your Rosy Minds Garden on this device? This will remove all collected blessings and cannot be undone."))return;
  localStorage.removeItem(STORAGE_KEY);
  state={completed:[],collected:[],petals:{}};
  quizSolved=false;
  renderGarden();renderCollection();renderDailyState();closeReward();
  window.scrollTo({top:0,behavior:"smooth"});
}

function setupInstall(){
  window.addEventListener("beforeinstallprompt",event=>{
    event.preventDefault();
    deferredInstallPrompt=event;
    $("installButton").hidden=false;
  });
  $("installButton").addEventListener("click",async()=>{
    if(!deferredInstallPrompt)return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt=null;
    $("installButton").hidden=true;
  });
  window.addEventListener("appinstalled",()=>{$("installButton").hidden=true;});
}

function init(){
  renderGarden();
  renderCollection();
  renderDailyState();
  document.querySelectorAll("[data-petal]").forEach(button=>button.addEventListener("click",()=>fillMoment(button.dataset.petal)));
  $("waterButton").addEventListener("click",waterGarden);
  $("reviewMomentButton").addEventListener("click",reviewToday);
  $("shareButton").addEventListener("click",shareGarden);
  $("rewardShareButton").addEventListener("click",shareGarden);
  $("resetButton").addEventListener("click",resetGarden);
  document.querySelectorAll("[data-close-modal]").forEach(el=>el.addEventListener("click",closeReward));
  document.addEventListener("keydown",event=>{if(event.key==="Escape")closeReward();});
  setupInstall();
  if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}

init();
