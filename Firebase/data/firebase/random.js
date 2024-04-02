
import { dbFS } from '../firebase/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'

const storeNames = [
    'Nike', 'Adidas', 'Apple Store', 'Walmart', 'Target', 'Amazon', 'Best Buy', 'Starbucks', 'McDonald\'s', 'Burger King',
    'Subway', 'Costco', 'Home Depot', 'Lowe\'s', 'CVS', 'Walgreens', 'KFC', 'Pizza Hut', 'Domino\'s Pizza', 'Papa John\'s Pizza',
    'Chick-fil-A', 'Taco Bell', 'Dunkin\' Donuts', 'Chipotle Mexican Grill', '7-Eleven', 'Panera Bread', 'Dollar General',
    'Family Dollar', 'Dollar Tree', 'Kroger', 'Publix', 'Albertsons', 'Safeway', 'Whole Foods Market', 'Trader Joe\'s', 'Aldi',
    'GameStop', 'AT&T Store', 'Verizon Wireless', 'T-Mobile', 'Sprint', 'USPS', 'FedEx', 'UPS Store', 'Staples', 'Office Depot',
    'PetSmart', 'Petco', 'Michaels', 'Hobby Lobby', 'Bed Bath & Beyond', 'Barnes & Noble', 'Books-A-Million', 'OfficeMax',
    'Jo-Ann Stores', 'Marshalls', 'T.J. Maxx', 'Ross Dress for Less', 'Old Navy', 'Gap', 'Banana Republic', 'H&M', 'Forever 21',
    'Zara', 'American Eagle Outfitters', 'Victoria\'s Secret', 'Bath & Body Works', 'Ulta Beauty', 'Sephora', 'MAC Cosmetics',
    'The Home Depot', 'Lowe\'s', 'IKEA', 'Macy\'s', 'Nordstrom', 'Bloomingdale\'s', 'Saks Fifth Avenue', 'Neiman Marcus',
    'Crate & Barrel', 'Pottery Barn', 'Williams-Sonoma', 'Sur La Table', 'Bed Bath & Beyond', 'West Elm', 'Anthropologie',
    'Urban Outfitters', 'The Container Store', 'World Market', 'Dillard\'s', 'Foot Locker', 'Finish Line', 'Dick\'s Sporting Goods',
    'Academy Sports + Outdoors', 'REI', 'Bass Pro Shops', 'Cabela\'s', 'The North Face', 'Patagonia', 'Columbia Sportswear',
    'Under Armour', 'L.L.Bean', 'Eddie Bauer', 'Orvis', 'Gander Outdoors', 'Ralph Lauren', 'Tommy Hilfiger', 'Calvin Klein',
    'Levi\'s', 'Wrangler', 'Diesel', 'Guess', 'Polo Ralph Lauren', 'Coach', 'Michael Kors', 'Kate Spade New York', 'Fossil',
    'Timberland', 'Dr. Martens', 'UGG', 'Vans', 'Converse', 'New Balance', 'ASICS', 'Puma', 'Skechers', 'Crocs', 'Merrell',
    'The North Face', 'Patagonia', 'Columbia Sportswear', 'Arc\'teryx', 'Marmot', 'Outdoor Research', 'Mountain Hardwear',
    'REI Co-op', 'Osprey', 'Black Diamond', 'Salomon', 'Keen', 'Birkenstock', 'Chaco', 'Teva', 'Hoka One One', 'Altra',
    'Brooks', 'Saucony', 'Helly Hansen', 'Columbia', 'Mountain Equipment Co-op', 'Lululemon Athletica', 'Athleta', 'lucy',
    'prAna', 'The North Face', 'Patagonia', 'REI Co-op', 'Arc\'teryx', 'Icebreaker', 'Smartwool', 'Marmot', 'Outdoor Research',
    'Black Diamond', 'Cotopaxi', 'Fjallraven', 'Osprey', 'Hydro Flask', 'CamelBak', 'Nalgene', 'Yeti', 'Thermos', 'Stanley',
    'Contigo', 'Zojirushi', 'Mizu', 'Klean Kanteen', 'LifeStraw', 'Platypus', 'GSI Outdoors', 'MSR', 'Katadyn', 'Sawyer',
    'Berkey', 'SteriPEN', 'Aquatabs', 'Polar Bottle', 'United Colors of Benetton', 'Oysho', 'Pull&Bear', 'Stradivarius',
    'Zalando', 'Desigual', 'Mango', 'C&A', 'Massimo Dutti', 'Esprit', 'OVS', 'Sisley', 'Bershka', 'Pepe Jeans', 'Tom Tailor',
    'Jack & Jones', 'Superdry', 'Quiksilver', 'Vans', 'Volcom', 'DC Shoes', 'Roxy', 'Rip Curl', 'Element', 'Hurley', 'Billabong',
    'Patagonia', 'Columbia Sportswear', 'The North Face', 'Arc\'teryx', 'Mountain Hardwear', 'Marmot', 'Black Diamond',
    'Outdoor Research', 'Eddie Bauer', 'REI Co-op', 'Salomon', 'Merrell', 'Keen', 'Vasque', 'La Sportiva', 'Scarpa',
    'Altra', 'Brooks', 'Hoka One One', 'Nike', 'Adidas', 'Under Armour', 'New Balance', 'ASICS', 'Saucony', 'Puma', 'Mizuno',
    'Reebok', 'Skechers', 'Vibram', 'On Running', 'Helly Hansen', 'Columbia', 'Patagonia', 'The North Face', 'Arc\'teryx',
    'Marmot', 'Mountain Hardwear', 'REI Co-op', 'Black Diamond', 'Outdoor Research', 'Icebreaker', 'Smartwool', 'Fjallraven',
    'Osprey', 'Hydro Flask', 'CamelBak', 'Nalgene', 'Yeti', 'Thermos', 'Stanley', 'Contigo', 'Zojirushi', 'Mizu',
    'Klean Kanteen', 'LifeStraw', 'Platypus', 'GSI Outdoors', 'MSR', 'Katadyn', 'Sawyer', 'Berkey', 'SteriPEN', 'Aquatabs',
    'Polar Bottle', 'United Colors of Benetton', 'Oysho', 'Pull&Bear', 'Stradivarius', 'Zalando', 'Desigual', 'Mango', 'C&A',
    'Massimo Dutti', 'Esprit', 'OVS', 'Sisley', 'Bershka', 'Pepe Jeans', 'Tom Tailor', 'Jack & Jones', 'Superdry', 'Quiksilver',
    'Vans', 'Volcom', 'DC Shoes', 'Roxy', 'Rip Curl', 'Element', 'Hurley', 'Billabong'
]

const prodNames = [
    'iPhone 15 Pro Max', 'Air Jordan 1 Low', 'Samsung Galaxy Fold 3', 'Nike Air Force 1', 'Sony PlayStation 5', 'MacBook Pro 2023',
    'Rolex Submariner', 'Canon EOS R5', 'Dyson V11 Vacuum Cleaner', 'Nintendo Switch OLED', 'Bose QuietComfort Earbuds', 'Google Pixel 7',
    'Microsoft Surface Laptop 5', 'Tesla Model S', 'Gucci Ace Sneakers', 'Louis Vuitton Neverfull Bag', 'DJI Mavic Air 2',
    'Fender Stratocaster Guitar', 'Cuisinart 14-Cup Food Processor', 'GoPro Hero 10', 'Fitbit Versa 4', 'Razer Blade 17', 'KitchenAid Stand Mixer',
    'Amazon Echo Show 10', 'HP Spectre x360', 'Oakley Holbrook Sunglasses', 'Patagonia Nano Puff Jacket', 'Canon EOS Rebel T8i',
    'Vitamix Blender', 'Adidas Ultraboost Shoes', 'Nintendo Switch Pro Controller', 'Apple Watch Series 8', 'Samsung QLED 8K TV',
    'Logitech MX Master 3 Mouse', 'GoPro Max', 'LG OLED C1 TV', 'Philips Hue Smart Bulbs', 'Garmin Forerunner 955', 'Dell XPS 17',
    'Bose SoundLink Revolve+', 'Panasonic Lumix GH6', 'Tory Burch Miller Sandals', 'DJI Ronin-S', 'Sonos One Speaker', 'Le Creuset Dutch Oven',
    'Roku Ultra', 'Breville Barista Express Espresso Machine', 'Fujifilm X-T4', 'Nikon Z9', 'Apple AirPods Pro', 'Sennheiser Momentum True Wireless 2',
    'Xbox Series X', 'PlayStation VR 2', 'Nintendo Switch Lite', 'ASUS ROG Strix Scar 17', 'Samsung Odyssey G9 Monitor', 'LG Gram 17',
    'Apple iPad Air', 'Canon RF 50mm f/1.2L USM Lens', 'Beats Studio Buds', 'HP Envy 32 Monitor', 'Casio G-Shock Watch', 'Bose Frames Audio Sunglasses',
    'Dyson Supersonic Hair Dryer', 'Sony WH-1000XM4 Headphones', 'Nikon D850', 'Apple Mac Pro', 'Razer BlackWidow V3 Keyboard',
    'Samsung Galaxy Tab S8', 'Fitbit Charge 5', 'Garmin Fenix 7', 'Fender Precision Bass', 'LG CineBeam Projector', 'Microsoft Xbox Elite Wireless Controller Series 2',
    'Google Nest Hub Max', 'JBL Flip 5 Speaker', 'Sony Alpha A7 IV', 'Apple TV 4K', 'Canon PIXMA Pro-100 Printer', 'Garmin Edge 1030 Plus',
    'LG OLED G1 TV', 'Dell Alienware m17 R4', 'Roku Streaming Stick+', 'Breville Smart Oven Air', 'Dyson V11 Outsize Vacuum Cleaner', 'DJI Mini 2',
    'YETI Tundra 45 Cooler', 'Patagonia Better Sweater', 'Adidas Superstar Shoes', 'Microsoft Surface Pro X', 'Samsung Galaxy Watch 4',
    'Fujifilm Instax Mini 11', 'Bose Home Speaker 500', 'Nikon Z 24-70mm f/2.8 S Lens', 'Canon EOS R6', 'Apple MacBook Air', 'GoPro Hero 9',
    'Nintendo Game & Watch: Super Mario Bros', 'Fitbit Inspire 2'
]

const cities = [
    'Toronto', 'Hamilton', 'London', 'Ottawa', 'Mississauga', 'Brampton', 'Markham', 'Vaughan', 'Kitchener',
    'Oakville', 'Burlington', 'Richmond Hill', 'Guelph', 'Cambridge', 'Waterloo', 'Windsor', 'Ajax', 'Pickering',
    'Thunder Bay', 'Sudbury', 'Peterborough', 'Barrie', 'Kingston', 'Chatham-Kent', 'Brantford', 'Niagara Falls',
    'North Bay', 'Sault Ste. Marie', 'Kawartha Lakes'
]

function add() {

    const randomCityIndex = Math.floor(Math.random() * cities.length)
    const randomCity = cities[randomCityIndex]
    const address = `${randomCity}, ON`
    return address

}

function getRandomstoreNames() {

    const randomIndex = Math.floor(Math.random() * storeNames.length)
    const randomstoreNames = storeNames[randomIndex]
    return randomstoreNames

}

function getRandomProductName() {

    const randomIndex = Math.floor(Math.random() * prodNames.length)
    const randomProductName = prodNames[randomIndex]
    return randomProductName

}

function generateRandomCombination() {

    const minLength = 100
    const maxLength = 9999
    const randomNumber = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength
    return randomNumber

}

function generateRandomDate() {

    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ]

    const randomMonthIndex = Math.floor(Math.random() * months.length)
    const selectedMonth = months[randomMonthIndex]
    const randomDay = Math.floor(Math.random() * 30) + 1
    const dateString = `${selectedMonth} ${randomDay}, 2024`
    return dateString

}

function newTodo() {

    const todoDB = collection(dbFS, 'finance-transac')

    const randomStore = getRandomstoreNames()
    const randomProd = getRandomProductName()
    const randomPrice = generateRandomCombination()
    const randomDate = generateRandomDate()
    const randomAddress = add()

    addDoc(todoDB, {

        productName : randomProd,
        productPrice: randomPrice,
        storeName   : randomStore,
        storeAddress: randomAddress,
        transactDate: randomDate

    })

}

module.exports = {
    newTodo
}

export { storeNames, prodNames }