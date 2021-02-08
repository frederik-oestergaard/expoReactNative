import firebase from 'firebase-admin';

interface ILatLng {
  lat: number;
  lng: number;
}

interface ITrackingDocument {
  active: boolean;
  deviceID: string;
  expectedArrival: firebase.firestore.Timestamp;
  postingTime: firebase.firestore.Timestamp;
  geo: firebase.firestore.GeoPoint;
}

initializeFirebase();

const trackingDocumentID: string = '9003';
const timeBetweenNavigation: number = 5000;
const expectedArrival = getExpectedArrivalTime();
const trackingCollection = firebase.firestore().collection('tracking');

start();

async function start(): Promise<void> {
  console.log('Started courier navigation simulator');

  for (const latLng of getLatLngFromFoetexToSG()) {
    await setTrackingDocument(mapLatLngToTrackingDocument(latLng));
    await sleep(timeBetweenNavigation);
  }

  console.log('Finished courier navigation simulator');
}

function mapLatLngToTrackingDocument(latLng: ILatLng): ITrackingDocument {
  return {
    active: true,
    deviceID: 'some ID',
    expectedArrival: firebase.firestore.Timestamp.fromDate(expectedArrival),
    postingTime: firebase.firestore.Timestamp.fromDate(new Date()),
    geo: new firebase.firestore.GeoPoint(latLng.lat, latLng.lng),
  };
}

function getExpectedArrivalTime(): Date {
  const latLngFromFoetexToSG = getLatLngFromFoetexToSG();
  const msToArrival = timeBetweenNavigation * latLngFromFoetexToSG.length;
  return new Date(Date.now() + msToArrival);
}

async function setTrackingDocument(document: ITrackingDocument): Promise<void> {
  const docRef = trackingCollection.doc(trackingDocumentID);

  try {
    await docRef.set(document, { merge: true });
    console.log('Item set');
  } catch (error) {
    console.log('Failed to create or update tracking document');
    console.log(error);
  }
}

async function sleep(ms:number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function initializeFirebase(): void {
  try {
    firebase.initializeApp({
      credential: firebase.credential.cert(
        require('./assets/firebaseServiceAccountKey.json')
      ),
    });
  } catch (error) {
    console.log(`Failed to initialize firebase app. \t
      Verify you added the firebaseServiceAccountKey.json file here: "{workplaceFolder}/packages/sg-next-app/scripts/assets/firebaseServiceAccountKey.json"`);
    console.log(error);
    process.abort();
  }
}

function getLatLngFromFoetexToSG(): Array<ILatLng> {
  return [
    { lat: 56.158833796366935, lng: 10.207521915435791 },
    { lat: 56.158863670398205, lng: 10.207371711730957 },
    { lat: 56.15883977117505, lng: 10.206813812255858 },
    { lat: 56.15883977117505, lng: 10.206245183944702 },
    { lat: 56.15883977117505, lng: 10.205676555633545 },
    { lat: 56.15882184674794, lng: 10.205183029174805 },
    { lat: 56.158851720788476, lng: 10.20457148551941 },
    { lat: 56.158869645201676, lng: 10.20429253578186 },
    { lat: 56.15917435894617, lng: 10.20429253578186 },
    { lat: 56.159365550649866, lng: 10.204238891601562 },
    { lat: 56.15964636173946, lng: 10.204228162765503 },
    { lat: 56.15987339899201, lng: 10.204142332077025 },
    { lat: 56.159855475047195, lng: 10.203777551651001 },
    { lat: 56.159730007199144, lng: 10.203133821487427 },
    { lat: 56.15961648831684, lng: 10.2028226852417 },
    { lat: 56.159473095565005, lng: 10.20229697227478 },
    { lat: 56.159269954916944, lng: 10.201642513275146 },
    { lat: 56.15912058610806, lng: 10.201277732849121 },
    { lat: 56.158845745982234, lng: 10.200848579406738 },
    { lat: 56.158684425862155, lng: 10.200483798980711 },
    { lat: 56.158409582615874, lng: 10.199882984161377 },
    { lat: 56.15826618535897, lng: 10.19956111907959 },
    { lat: 56.158379708231486, lng: 10.19932508468628 },
    { lat: 56.158242285764096, lng: 10.198745727539062 },
    { lat: 56.1580749881838, lng: 10.197769403457642 },
    { lat: 56.1579614644108, lng: 10.197093486785889 },
    { lat: 56.15785391526379, lng: 10.196428298950195 },
    { lat: 56.157752340792904, lng: 10.19582748413086 },
    { lat: 56.15757309107156, lng: 10.194958448410034 },
    { lat: 56.15753126601623, lng: 10.194185972213745 },
    { lat: 56.15719068887069, lng: 10.192716121673582 },
    { lat: 56.15711898803427, lng: 10.191943645477295 },
    { lat: 56.1568919345028, lng: 10.190688371658325 },
    { lat: 56.156736581313375, lng: 10.189712047576904 },
    { lat: 56.156617078432475, lng: 10.188950300216675 },
    { lat: 56.156455748953654, lng: 10.187920331954956 },
    { lat: 56.15637209636462, lng: 10.18709421157837 },
    { lat: 56.15634819559142, lng: 10.186042785644531 },
    { lat: 56.15632429480336, lng: 10.18508791923523 },
    { lat: 56.15630636920257, lng: 10.18458366394043 },
    { lat: 56.15630636920257, lng: 10.183210372924805 },
    { lat: 56.156258567559554, lng: 10.181751251220703 },
    { lat: 56.156210765857054, lng: 10.180721282958984 },
    { lat: 56.15611516227363, lng: 10.17951965332031 },
    { lat: 56.15606736039271, lng: 10.178232192993164 },
    { lat: 56.15592395439312, lng: 10.176515579223633 },
    { lat: 56.155876152274296, lng: 10.175056457519531 },
    { lat: 56.15568494320426, lng: 10.173168182373047 },
    { lat: 56.15549373318262, lng: 10.17033576965332 },
    { lat: 56.15530252220936, lng: 10.167760848999023 },
    { lat: 56.15515911335493, lng: 10.16535758972168 },
    { lat: 56.155063507154594, lng: 10.163469314575195 },
    { lat: 56.15492009740803, lng: 10.161752700805664 },
    { lat: 56.15487229404024, lng: 10.159778594970703 },
    { lat: 56.15453766880024, lng: 10.157203674316404 },
    { lat: 56.15439425709094, lng: 10.154027938842773 },
    { lat: 56.15420304064591, lng: 10.152053833007812 },
    { lat: 56.154059627687616, lng: 10.150594711303711 },
    { lat: 56.15401182324923, lng: 10.14887809753418 },
    { lat: 56.15377280016514, lng: 10.146732330322266 },
    { lat: 56.15358158062731, lng: 10.144414901733398 },
    { lat: 56.15343816534941, lng: 10.142183303833008 },
    { lat: 56.15329474953622, lng: 10.13986587524414 },
    { lat: 56.153199138696685, lng: 10.137548446655273 },
    { lat: 56.15305572199134, lng: 10.135574340820312 },
    { lat: 56.15276888697474, lng: 10.132913589477539 },
    { lat: 56.152721080930476, lng: 10.1308536529541 },
    { lat: 56.15257766244079, lng: 10.128192901611328 },
    { lat: 56.152529856158594, lng: 10.126476287841797 },
    { lat: 56.15248204981694, lng: 10.123472213745117 },
    { lat: 56.15262546866347, lng: 10.12089729309082 },
    { lat: 56.15267327482672, lng: 10.118494033813477 },
    { lat: 56.15286449888485, lng: 10.115833282470703 },
    { lat: 56.15286449888485, lng: 10.113344192504881 },
    { lat: 56.15329474953622, lng: 10.110597610473633 },
    { lat: 56.153677190515175, lng: 10.107593536376953 },
    { lat: 56.15401182324923, lng: 10.103216171264648 },
    { lat: 56.153964018751346, lng: 10.100812911987305 },
    { lat: 56.15372499536989, lng: 10.097723007202147 },
    { lat: 56.15343816534941, lng: 10.094804763793944 },
    { lat: 56.15324694414618, lng: 10.091285705566406 },
    { lat: 56.153151333187715, lng: 10.088281631469727 },
    { lat: 56.15267327482672, lng: 10.083560943603516 },
    { lat: 56.15243424341579, lng: 10.080299377441406 },
    { lat: 56.15229082385551, lng: 10.076866149902344 },
    { lat: 56.15281669295954, lng: 10.074119567871094 },
    { lat: 56.15401182324923, lng: 10.073518753051758 },
    { lat: 56.15492009740803, lng: 10.072746276855469 },
    { lat: 56.155876152274296, lng: 10.071802139282227 },
    { lat: 56.15683218335044, lng: 10.071029663085938 },
    { lat: 56.15764479106045, lng: 10.070772171020508 },
    { lat: 56.15778819063682, lng: 10.069828033447266 },
    { lat: 56.15883977117505, lng: 10.069398880004881 },
    { lat: 56.15970013384161, lng: 10.069313049316406 },
    { lat: 56.16027369824766, lng: 10.069055557250977 },
    { lat: 56.160082511063855, lng: 10.067167282104492 },
    { lat: 56.16017810477468, lng: 10.064764022827148 },
    { lat: 56.16017810477468, lng: 10.063047409057617 },
    { lat: 56.15998691711512, lng: 10.060815811157227 },
    { lat: 56.16022590154091, lng: 10.059614181518555 },
    { lat: 56.161086233163196, lng: 10.059356689453125 },
    { lat: 56.1618509562069, lng: 10.059356689453125 },
    { lat: 56.16208992903591, lng: 10.05746841430664 },
    { lat: 56.16199434008271, lng: 10.056438446044922 },
    { lat: 56.16199434008271, lng: 10.05523681640625 },
  ];
}