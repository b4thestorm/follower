function unfollow(handles) {
  //var handles;
  var followingButton;
  var startTimeout;
  var base = "https://www.instagram.com/"
  var keep = ['g.xoxo', 'natiishax5', 'soniastagrams', 'elena.gonzalez.diaz', '_lovell_', 'kinghanma', 'starting5nick', 'realjosuevargass', 'curlycarm', 'dn.xx3', 'lestano28', 'guerillla__tacticz', '__basqui', 'scubba_steve23', 'silenttype', 'nataliakiraaa', 'younglord', 'fatboy911', 'onlyoneking95', 'theharlemarket', 'abutta492', '_daisa', 'hardest_workin_man117', 'ronnie.blanco', '_bookum', 'luckyvthename', 'sinbadnumba9', 'lindenewyork', 'cyberbrattt', 'illgreenz', 'mr.sanders', 'samsonpoet', 'da.ladieschoice']
  // handles = localStorage.getItem('followList')
  // handles = handles.split(',')

  // chrome.storage.sync.get('followList', function(data) {
  //   handles = data['followList'];
  // });

  const win = window.open(base + handles[0] + '/', "_blank");
  var i = 1;
  var interval = setInterval(function(){
    //check that the button says 'Following'

    if (keep.includes(handles[i]) === false) {
      followingButton = win.document.querySelector("#react-root > section > main > div > header > section > div.nZSzR > div.Igw0E.IwRSH.eGOV_._4EzTm > span > span.vBF20._1OSdk > button");

      if (followingButton.innerHTML === 'Following') {
        followingButton.click();

        startTimeout = setTimeout(function(){
          alert('was successful');
          }, 100);
        clearTimeout(startTimeout)

        win.document.querySelector("body > div.RnEpo.Yx5HN > div > div > div.mt3GC > button.aOOlW.-Cab_").click()
      }
    }

     win.location = base + handles[i];
     if (i++ > handles.length - 1) {
      //localStorage.setItem('followList', followList)
      clearInterval(interval)
     }
  }, 60000)
}

first = [
  "mvpboxpics",
  "rome_vidal",
  "coach_nelson163",
  "q.mariana",
  "malikcrhem",
  "snubbalito",
  "_alexandrabeauty",
  "prettyboy_blow",
  "mikey.rivers",
  "_ayomaggz_",
  "moneyclitchgod",
  "worldofhavoc",
  "baptistecarrara_dp",
  "christianladigoski",
  "aakaashbphoto",
  "mitts_wit_marksman",
  "ruby_rodriguez_325",
  "abediting",
  "jay_fleeee",
  "atuedadvasegui",
  "_d.0r",
  "itsamyruth",
  "mirandajanine",
  "_sashafitness_",
  "hassirv",
  "thehumanerrorguru",
  "daniella.ilaris",
  "chrissygx33",
  "destiny_marieoe",
  "jaiel.perez",
  "julianna.cnav",
  "teamnasty_apparel",
  "kjisunshine___",
  "dahvinci13",
  "iam_jlopez",
  "jlgboxing",
  "livadler",
  "vizualape",
  "coachsalasworldwide",
  "ms.vx",
  "jessiesalicetti",
  "sheilaa809",
  "ashegem",
  "kg.ny",
  "thekeekee_gee",
  "serenaciarra_",
  "skyxvibe",
  "citycigarlife",
  "angelique.x0",
  "kaylee.caba",
  "deborahh_g",
  "isabellaarmina",
  "thompsonlxs_",
  "obsessedwithc",
  "brokenimagination",
  "chassidy_caprice",
  "rp.nyc",
  "iamchrisny",
  "jacklynlune.photos",
  "tina890",
  "sinbadnumba9",
  "officialarielromeo",
  "iamjoehernandez",
  "destina_aliyah",
  "chinalizzle",
  "ill.visions",
  "oceanteamofficial",
  "santanaot_",
  "thee6boy",
  "breatheerin",
  "iamjayel",
  "omgdirtydee",
  "_flowerbommb",
  "mauriceluke",
  "sarah_j_81",
  "phenomenallugar_",
  "tonycandell",
  "prostyle",
  "35mmagik",
  "el_chiki12m",
  "s.stunnaaa",
  "rosehaless",
  "kingkarrot_",
  "yze_ets",
  "illgreenz",
  "samsonpoet",
  "gardenstatebandit_",
  "zaidaleee",
  "_qawaq",
  "jordanviision",
  "summer_hassett",
  "iamjoshdwh",
  "peoples_hernandez",
  "iamjulito",
  "titustheegreat",
  "brittneyblickman",
  "kimberlycantoni",
  "alexus.santiago",
  "kobe.no.bryant",
  "tashy.love",
  "iamcriss",
  "jordanrosedecker",
  "don_prynce",
  "veganbowls",
  "listennlinda",
  "trvpshots",
  "remaininfinite",
  "rvargasphotography",
  "chuck.baka",
  "chvndon",
  "n__rojas",
  "stashcashofficial",
  "onlyoneking95",
  "hardest_workin_man117",
  "da.ladieschoice",
  "forthahoney",
  "milani.bandz",
  "celinugh",
  "theampmlife",
  "bybiancar",
  "fernie_sc",
  "sarahswagss",
  "dupiefresh",
  "cashboycastellano",
  "yon_fn_",
  "jnxrey",
  "signature_s.a",
  "smwangphoto",
  "_amazingangie",
  "abbys0ul_",
  "amazingscorpiok",
  "nicki_rockk",
  "loralisselot",
  "kelychic",
  "nichole_pxo",
  "ashleynguzman",
  "specialkel_",
  "ravieb",
  "slimdollars",
  "weekly_foreplay",
  "ma.riah_",
  "allforthelovee",
  "photograngelo",
  "wtfamayah",
  "colombianluxe",
  "mikecam84",
  "ant_duble",
  "djgmoney156",
  "eaziedoesit",
  "sumnlite",
  "haley.redding",
  "topnotch__quan",
  "madrigalmusic",
  "dankablesbydank1",
  "carlagarcia7",
  "mariahlynnboss",
  "erod_highlyfavored",
  "divinascatering",
  "melissalopez835",
  "neo_0tf",
  "jorgeclar",
  "ent.world.models",
  "asantss",
  "youniquenclassy",
  "3fourlaw",
  "officially.ab",
  "robertmercadoworld",
  "notoriously_elegant",
  "gracierojas_",
  "iamsaramolina",
  "lovenikkki_",
  "yea_im_feisty",
  "kirsyscolon",
  "keepingupwithchi_",
  "kariadys",
  "queenpatrona",
  "bestoflia",
  "jayah.a",
  "chelseeag",
  "rahhyoung",
  "humblebeastjugg",
  "akela.y",
  "goddesscomplexx",
  "pennylux3",
  "lisbethgutierrezok"]

unfollow(first)
