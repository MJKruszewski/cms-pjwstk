import { News } from '@apiDomain/news.domain';
import { connectToDatabase } from '@apiMiddleware/mongo.middleware';
import { NEWS_COLLECTION } from '@apiRepository/collections.config';

const news: News[] = [
  {
    title: 'Promocja na płyty główne Asus TUF GAMING',
    createdAt: new Date(),
    cover: 'news/news1.png',
    summary: 'Obniżamy ceny dwóch płyt głównych - TUF GAMING Z490-PLUS oraz Z490-PLUS WIFI. Skorzystaj z kodu rabatowego!',
    content: '<b>Jak obniżyć ceny produktów?</b><br/><br/>' +
            'Wzięcie udziału w akcji promocyjnej jest bardzo proste. Wystarczy dodać do koszyka jedną z wymienionych płyt głównych, a następnie wpisać właściwy kod rabatowy: Z490<br/><br/>' +
            'Dodatkowo, w przypadku zakupu wymienionych płyt obowiązuje darmowa wysyłka. Oba produkty kierowane są przede wszystkim do graczy, którzy chcą złożyć komputer pozwalający na obsługę najnowszych produkcji z segmentu AAA. ' +
            'Płyty główne Asus TUF GAMING wyróżniają się chipsetem Intel Z490 oraz obsługą gniazda procesora Socket 1200. Są więc kompatybilne z układami Intela dziesiątej generacji.<br/><br/>' +
            'Do tego wszystkiego dochodzi obsługa pamięci RAM o częstotliwości do 4800 MHz, możliwość łączenia kart graficznych w systemie 2-Way CrossFireX, a także wiele slotów, portów i złączy.  Z490-PLUS WIFI zapewnia dodatkowo dostęp do anteny WIFI.<br/><br/>' +
            ''
  },
  {
    title: 'Zobacz co oferują karty NVIDIA RTX z serii 30',
    createdAt: new Date(),
    cover: 'news/news2.png',
    summary: 'Chcesz kupić kartę graficzną, która zapewni doskonałe osiąg w grach? Sprawdź, jaki model warto wybrać.',
    content: '<b>Co robi karta graficzna? Jakie spełnia zadania?</b><br/><br/>' +
            'Tak zwani użytkownicy domowy często na pytanie o to, jaką kartę graficzną wybrać, odpowiadają: żadną. Postanawiają ograniczyć się wyłącznie do jednostek zintegrowanych, ponieważ nie zamierzają zajmować się projektowaniem grafiki. To jednak mylne zrozumienie roli tego komponentu.<br/><br/>' +
            'Zgodnie z uproszczoną definicją, karta graficzna, na podstawie instrukcji z procesora, generuje obraz wyświetlany na monitorze. Jak więc można się domyślić, jest niezbędnym elementem komputera. Nie oznacza to jednak, że każdy model okaże się wystarczający. Wiele zależy bowiem od tego, z jakimi programami będzie miała ona do czynienia.<br/><br/>' +
            'W przypadku pracy biurowej, wystarczająca będzie podstawowa, mało wydajna karta graficzna. Wyświetlanie pulpit Windows i okien prostych programów nie jest zbyt wymagające, dlatego nasza maszyna nie będzie potrzebowała dodatkowej pamięci, pochodzącej właśnie z karty. To samo tyczy się obsługi prostych narzędzi multimedialnych. W tym zakresie, jednostki zintegrowane rzeczywiście mogą wystarczyć.<br/><br/>' +
            'Inaczej jednak wygląda kwestia obsługi gier. Generują one skomplikowaną, trójwymiarową grafikę, do obsługi której potrzebny jest bardziej zaawansowany sprzęt. Zwłaszcza gdy mamy do czynienia z produkcjami nowymi, wyróżniającymi się bardzo rozbudowaną oprawą graficzną. W takim przypadku niezbędne okażą się modele z najwyższej półki, na przykład takie jak karty graficzne Nvidia GeForce RTX 30xx.<br/><br/>' +
            '<b>Co to jest zintegrowana karta graficzna?</b><br/><br/>' +
            'Karty graficzne mogą być zintegrowane z procesorem lub mieć postać osobnego komponentu (tzw. dedykowane). Ten pierwszy rodzaj kart to produkty, które nie dysponują własną, dedykowaną pamięcią. Jest ona współdzielona z pamięcią RAM całego układu – tak rozumiane dzielenie zasobów jest regulowane za sprawą oprogramowania BIOS. Z tego też powodu zintegrowana karta graficzna w przypadku bardziej wymagających operacji okaże się zbyt słaba. Nie będzie w stanie zagwarantować odpowiedniej wydajności – w grach przekłada się to na niską ilość klatek na sekundę, odpowiedzialnych za płynność obrazu.<br/><br/>' +
            'Jeżeli więc potrzebujesz wydajnej karty graficznej do grania, szukaj modeli dedykowanych, które dysponują własną pamięcią oraz wysoką częstotliwością taktowania. W przypadku takich kart jak GeForce RTX 30, ilość pamięci wynieść może nawet 24 GB. Wszystko to zapewnia bezproblemową obsługę najnowszych gier na wysokich detalach graficznych.<br/><br/>' +
            '<b>Jakie firmy produkują karty graficzne?</b><br/><br/>' +
            'W chwili obecnej karty graficzne na rynek konsumencki produkują trzy firmy:<br/>' +
            '<b>Intel</b> – zajmuje się przygotowywaniem przede wszystkim jednostek zintegrowanych z procesorami. Będą to między innymi modele Intel UHD Graphics oraz Iris Pro,<br/>' +
            '<b>AMD</b> – firma dostarcza karty zintegrowane i dedykowane. W tej drugiej grupie znajdują się między innymi gamingowe modele AMD Radeon RX,<br/>' +
            '<b>NVIDIA</b> – producent wielu jednostek dedykowanych, przeznaczonych do użytku domowego, biznesowego, specjalistycznego (NVIDIA Quadro) i gamingowego – uwagę warto zwrócić zwłaszcza na modele GeForce GTX i RTX w wersji 20 i 30. Obecnie najmocniejsze karty gamingowego tego producenta to urządzenia RTX 3060 Ti, 3070, 3080 oraz 3090.<br/><br/>' +
            '<b>Jaką firmę najlepiej wybrać? Które karty graficzne są najlepsze?</b><br/><br/>' +
            'Jeżeli potrzebujesz wydajnej karty zapewniającej najwyższą wydajność w grach komputerowych, najpewniejszym wyborem jest jeden z modeli firmy NVIDIA. Mowa tu zwłaszcza o jednostkach RTX 30xx, które zapewniają nie tylko ogromną wydajność, ale również obsługę technologii Ray Tracingu.<br/><br/>' +
            'Firma AMD przez wielu graczy jest niedoceniana. Zapewnia ona dostęp do wielu naprawdę przyzwoitych jednostek. Jak już wspomnieliśmy, szczególnie ciekawie prezentują się modele Radeon RX. Uwagę warto zwrócić chociażby na karty graficzne AMD Radeon RX 5600XT oraz RX 580.<br/><br/>' +
            '<b>Jakie karty graficzne oferuje NVIDIA?</b><br/><br/>' +
            'Oferta tego producenta jest rozwijana od wielu lat. I choć obecnie na rynku znaleźć można wiele modeli wiekowych, a także jednostki używane, obecnie uwagę należy zwrócić na 4 generacje kart graficznych od Nvidii. Każda z nich oferuje nieco inną wydajność i obsługę innych technologii.<br/><br/>' +
            ''
  }
];

export async function newsFixture () {
  const db = await connectToDatabase();
  const collection = await db.collection(NEWS_COLLECTION);

  for (let i = 0; i < 5; i++) {
    news.forEach(item => {
      collection.insertOne({ ...item });
    });
  }
}
