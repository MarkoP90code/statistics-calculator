//map()
//filter()
//reduce()
//regex
//new Set() - A Set is a data structure that only allows UNIQUE VALUES. If you pass an array into the Set constructor, it will remove any duplicate values.
//new Set().size - izbacuje koliko unikatnih elemenata ima. Znaci za npr 2,2,2,2,2 izbacice 1 posto je samo 2 unikatno.
//Object.values() - izbacuje array u kome su vrednosti svakog clana u objektu  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values.
//Object.keys() - jedan od primera  https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_object_keys2.
//Math.max()
//Math.min()
//sort()
//slice()

//In this challenge, you will build a statistics calculator that takes a set of numbers and returns the mean, median, mode, standard deviation, and variance.

//1.    OVDE RADIM TAKO D SVE BUDE VEZANO ZA BROJEVE A NE ZA STRING POSTO CU TRAZITI SREDNJE VREDNOSTI I STA VEC, A TO MOGU SAMO SA BROJEVIMA.
window.calculate = function() {       //U html-u je pozvana ova funkcija na form elementu.
    const value = document.querySelector("#numbers").value;
    const array = value.split(/,\s*/g);                 //Valjda je ovo u zagradi RegEx. Pravi split gde je "," i iza zareza prazno mesto tj. razmak (\s) ili ne mora biti razmak jer "*" znaci nula ili vise ponavljanja. Znaci pravi split gde je "," ili ", " ili ",  " itd. Da sam imao sve ovo okruzeno sa [] onda bi drugacije bilo.   Objasnjenje ima ovde https://www.w3schools.com/python/python_regex.asp#:~:text=A%20RegEx%2C%20or%20Regular%20Expression,contains%20the%20specified%20search%20pattern.
    const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));    //Ovo je ona dva ispod spojena.
    const mean = getMean(numbers);      //Iz 2. koraka.
    const median = getMedian(numbers);  //Iz 3. koraka.
    const mode = getMode(numbers);
    const range = getRange(numbers);
    const variance = getVariance(numbers);
    const standardDeviation = getStandardDeviation(numbers);

    document.querySelector("#mean").textContent = mean;         //Napise srednju vrednost.
    document.querySelector("#median").textContent = median;
    document.querySelector("#mode").textContent = mode;
    document.querySelector("#range").textContent = range;
    document.querySelector("#variance").textContent = variance;
    document.querySelector("#standardDeviation").textContent = standardDeviation;

    // const numbers = array.map((el) => Number(el));      //Posto je input uvek string ovako pretvorimo u brojeve.
    // const filtered = numbers.filter((el) => !isNaN(el));    //isNaN izbacuje true ako nije broj, a !isNan izbacuje true ako jeste broj i onda ubacuje taj broj u array.
}

//2. TRAZIMO SREDNJU VREDNOST
const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;    //Ispod detaljnije objasnjeno. Ovde koristim implicit return.

// const getMean = (array) => {                     //OVDE TRAZIMO SREDNJU VREDNOST.
//     const sum = array.reduce((acc, el) => acc + el, 0);         //Ovde je "0" inicijalna vrednost sto znaci u prvom koraku je acc=0 i na to se dodaje prvi(nulti) element array-a. U drugom krugu taj zbir postaje acc i na to se dodaje el.    U Slucaju da ne zadamo inicijalnu vrednost u prvom koraku acc je prvi clan array-a i na njega se dodaje el sto je drugi clan array-a. U drugom koraku acc je zbir acc+el iz prvog koraka i na to se dodaje sledeci el itd.
//     const mean = sum / array.length;
    
//     return mean;
// }


//3.    The median is the midpoint of a set of numbers. Ako je neparan broj elemenata uzima srednji element, a ako je paran uzima dva srednja elementa i trazi srednju vrednost od ta dva.
const getMedian = (array) => {  //Ovo SLICE() u sledecem redu sam objasnio skroz dole.
    // console.log(array);
    const sorted = array.slice().sort((a, b) => a - b);            //Step 20. - The first step in calculating the median is to ensure the list of numbers is sorted from least to greatest. Once again, there is an array method ideal for this – the .sort() method.
    // console.log(array);
    // console.log(sorted);
    const median = array.length % 2 === 0 ? getMean([sorted[array.length / 2], sorted[array.length / 2 - 1]]) : sorted[Math.floor((array.length) / 2)];   //Bitno je da kad pozivam getMean([]) NE ZABORAVIM OVE ZAGRADE UNUTRA ZA ARRAY. BEZ TOGA NE RADI. If the list has an odd number of numbers, the middle number is the median. If the list has an even number of numbers, the median is the average of the two middle numbers.

    return median;          //Like the getMean function, you could condense this code into one line and reduce the number of variables you instantiate. However, it is important to remember that shorter code is not always better code. In this case, reducing the lines of code would make the code harder to read and understand, impacting future maintainability.
}


//4.    Your next calculation is the mode, which is the number that appears most often in the list.
const getMode = (array) => {
    const counts = {};          //Step 26. - In your new function, declare an empty counts object. You will use this to track the number of times each number appears in the list.
    array.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1;         //OVDE SAM KORISTIO BRACKET NOTATION ZA OBJEKTE (IMA U WORDU). *DRUGI NACIN JE ISPOD. I mislim da u ovom slucaju mora da se koristi bracket notation. Nisam uspeo da ispetljam dot notation-om. Ovo je step 27. Broji koliko puta se pojavljuje koja cigra. Za prvi put uzima 0 i dodaje 1 i onda ako se opet pojavi uzima tu vrednost umesto 0 i dodaje 1.
})
    if (new Set(Object.values(counts)).size === 1) {            //** ispod dodatno.   Object.values() izbacuje array u kome su vrednosti svakog clana u objektu  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values.   A Set is a data structure that only allows unique values. If you pass an array into the Set constructor, it will remove any duplicate values. new Set().size - izbacuje koliko unikatnih elemenata ima. Znaci za npr 2,2,2,2,2 izbacice 1 posto je samo 2 unikatno.   There are a few edge cases to account for when calculating the mode of a dataset. First, if every value appears the same number of times, there is no mode.
    return null         //Ovo ako je ispunjeno ovo ispod ni ne gleda.
  }
    const highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];        //*** ispod.   Ovde nam sluzi da napravi array u kom ime svake vrednosti u objektu. U nasem slucaju to ce biti brojevi. Jedan od primera - https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_object_keys2
    // console.log(counts)
    // console.log(Object.keys(counts))
    // console.log(highest)
    const mode = Object.keys(counts).filter((el) => counts[el] === counts[highest]);     //**** ispod.
    // console.log(mode);

    return mode.join(", ");             //Mode is an array, so return it as a string with the .join() method. Separate the elements with a comma followed by a space.
}


//5.    Your next calculation is the range, which is the difference between the largest and smallest numbers in the list.
const getRange = (array) => Math.max(...array) - Math.min(...array);    //Ovde radim spread zato sto u Math max i min mi u zagradi trebaju brojevi ali da nije array. Da nisam radio spread bilo bi Math.max([x1, x2, x3]), a sa spread bude Math.max(x1, x2, x3).


//6.    The variance of a series represents how much the data deviates from the mean, and can be used to determine how spread out the data are. The variance is calculated in a few steps.
const getVariance = (array) => {
    const mean = getMean(array);

    const variance = array.reduce((acc, el) => {           //***** ispod objasnjenje.
        // console.log(acc);
        const difference =  el - mean;
        const squared = difference ** 2;
        return acc + squared;
    }, 0) / array.length;           //Potrebno je i ovo  / array.length; kad se racuna variance

    //  console.log(variance);
     return variance;

    //OVAKO JE DUZE ALI SAM OSTAVIO AKO NESTO NE BUDEM RAZUMEO.
    // const differences = array.map((el) => el - mean);       //Step 38. - The next step is to calculate how far each element is from the mean. Declare a differences variable, and assign it the value of array.map(). For the callback, return the value of el minus mean.
    // const squaredDifferences = differences.map((el) => el**2);      //Ovde "el**2" znaci el na kvadrat.
    // const sumSquaredDifferences = squaredDifferences.reduce((acc, el) => acc + el, 0);          //reduce() sam gore vec koristio. Step 40. - Next, you need to take the sum of the squared differences. Declare a sumSquaredDifferences variable, and assign it the value of squaredDifferences.reduce(). For the callback, return the sum of acc and el. Remember to set the initial value to 0.

    // const variance = array.reduce((acc, el) => {}, 0);
}


//7.    Your final calculation is the standard deviation, which is the square root of the variance.
const getStandardDeviation = (array) => {
    const variance = getVariance(array);
    const standardDeviation = Math.sqrt(variance);      // Vadi koren.      Moglo je i ovako Math.pow(variance, 1/2); Ovo dize variance na 1/2, tj radi variance^(1/2), odnosno to je koren iz variance.
    
    return standardDeviation;
}





//*
// const getMode = (array) => {
//     const counts = {};          
//     array.forEach((el) => {
//     if (counts[el]){
//         counts[el] = counts[el] + 1;
//     }   else {
//         counts[el] = 1;
//     }
    
//     console.log(counts)
// })
// console.log(counts)
// }


// **
// 1. Ako se svaka cifra pojavljuje isti broj puta onda mode ne postoji. To znaci i ako imamo jednu cifru samo
// da mode ne postoji. Npr ako nam je input 2,2,2,2,2 onda je counts = {2: 5}
// onda je Object.value(counts) = [5],
// onda je new Set(Object.values(counts)).size = 1, a ako je jedan imamo if sto izbacuje null.
// 2. Ako imam input 2,3,4 onda je counts {2: 1, 3: 1, 4: 1}, ISTO COUNT IZGLEDA I AKO JE INPUT 4,3,2 (cisto da naglasim)
// onda je Object.value(counts) = [1, 1, 1],
// onda je new Set(Object.values(counts)) = 1 jer se beleze samo unikatne vrednosti i onda je i size = 1
// i to mi aktivira if statement.


// ***
// Ovde Object.keys(counts) izbaci ove vrednosti https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
// onda ih sort((a, b) => counts[b] - counts[a]) sortira, ALI TAKO DA SORTIRA a i b (sto su imena clanova objekta)
// pomocu counts[b] i counts[a] sto su vrednosti clanova objekta.
// Znaci ako je objekat {2: 1, 3: 2, 4: 1} sort ce sortirati 2,3,4 pomocu 1,2,1 (posto je counts[b] - counts[a]
// znaci sortira od najveceg ka najmanjem). Znaci dobijamo [3,2,4]. Ovo 2 i 4 nam nije bitno jer uzimamo [0] clan
// ovako const highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
//BTW OVDE BI RADILO I SA DOT NOTATION counts.b - counts.a


// ****
// mode ce izbaciti array.
// primer inputa 4,4,3,2,2
// counts = {2: 2, 3: 1, 4: 2} (po defaultu ih redja od najmanjeg ka najvecem);
// Object.keys(counts) izbaci [2, 3, 4];
// .filter((el) => counts[el] === counts[highest]); trazi sta zadovoljava ovaj kriterijum u zagradi i to ubacuje
// u mode array. 
// Da objasnim prvo counts[highest] - highest sam izracunao i ta const izbaci broj koji se pojavljuje najvise puta,
// znaci u ovom slucaju se najvise pojavljuju 2 i 4 ali ako uradim console.log(highest) izbaci samo 2 zato sto 
// je to prvo na listi. Nije ni bitno jer je counts[2] i counts[4] IDBObjectStore, tj. 2 jer se pojavljuju 2 puta.
// Znaci filter uzima 2 tj. counts[2] i uporedjuje ga sa counts[highest] sto je counts[2] i oni su jednaki sto znaci
// da 2 ubacuje u array. 
// Sledece uzima counts[3] i uporedjuje sa counts[highest]. Posto je counts[3] = 1, a 
// counts[highest] = 2 znaci da elemenat 3 ne ubacuje u mode array. 
// Sledece uzima counts[4] i uporedjuje sa counts[highest]. Posto je counts[4] = 2 i counts[highest] = 2 znaci
// da ubacuje elemenat 4 u array i onda dobijamo,
// mode = [2, 4];


// *****
// Primer za inpuit 1,2,3,4,5
// Posto imam inicijalnu vrednost zadatu "0" onda je u prvom koraku acc = 0, a el = 1.
// Ako uradim console.log(acc) vidim da je 0.
// const difference =  el - mean; U prvoj iteraciji el = 1, a mean = 3 za ovaj slucaj.  1 - 3 = -2
// const squared = difference ** 2; Kvadriram difference.   -2^2 = 4
// return acc + squared; acc + squared postaje acc u sledecem koraku. Tako reduce() radi. Rezultat prve iteracije
// je acc u sledecoj iteraciji. Posto je acc = 0 i squared = 4 u prvoj iteraciji onda je 0 + 4 = 4 i to je
// acc u sledecoj iteraciji. Console.log(acc) ce izbaciti 4.
// Ovo se ponavlja za svaki clan ali kad ubacim el = 5 sa tom iteracijom zavrsava variance funkciju i
// nece raditi vise console.log(acc). Ali sam zato ispod uradio console.log(variance) i to onda pokaze rezultat.
//I onda sve podelim da brojem clanova u array-u. array.length.


// SLICE OBJANJENJE
// Slice radi ono da mogu da isecem koje clanove array-a hocu ali u ovom slicaju kad stavim prazan slice()
// ispred sort() onda sort ne menja originalni array.
// 1. Ako ne stavim slice i uradim console.log() (gore mi je obelezeno na kojim mestima) videcu da se originalni
// array menja.
// 2. Ako stavim slice() originalni array se ne menja.