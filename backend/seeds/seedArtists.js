import db from "../src/config/db.js";
import Artist from "../src/models/artist.js";

async function seedArtists() {
    try {
        await db.authenticate();
        console.log("DB Connected!");

        await db.sync({ alter: true });

        await Artist.bulkCreate([
            {
                name: "Hamid El Kasri",
                photo: "https://upload.wikimedia.org/wikipedia/commons/??/??.jpg or use image from turn1image0",
                description: "Renowned Moroccan Gnawa master musician known for his deep voice and guembri playing."
            },
            {
                name: "Mahmoud Guinia",
                photo: "https://i.ytimg.com/vi/kjDZYqcSIB0/hqdefault.jpg",
                description: "Legendary Gnawa master from Essaouira and hugely influential figure in the tradition."
            },
            {
                name: "Asma El Hamzaoui",
                photo: "https://fasching.se/en/9303/Asmaa-Hamzaoui.jpg",
                description: "One of the first prominent female Gnawa musicians, leader of Bnat Timbouktou."
            },
            {
                name: "Asma El Hamzaoui (alternate)",
                photo: "https://www.thenationalnews.com/media/2019/11/04/Asmaa-Hamzoui-gimbri-music.jpg",
                description: "Moroccan Gnawa singer and musician, known for breaking gender barriers in the genre."
            },
            {
                name: "Hassan Hakmoun",
                photo: "https://upload.wikimedia.org/wikipedia/commons/??/?.jpg or use image from turn2image10",
                description: "Moroccan musician specializing in Gnawa music, noted for fusion and world music collaborations."
            },{
                name: "Mahmoud Guinia",
                photo: "https://i.ytimg.com/vi/kjDZYqcSIB0/hqdefault.jpg",
                description: "Legendary Gnawa master from Essaouira and hugely influential figure in the tradition."
            },
        ]
        );

        console.log("Artists seeded successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Seeding error:", err);
        process.exit(1);
    }
}

seedArtists();
