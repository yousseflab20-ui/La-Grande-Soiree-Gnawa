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
                photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtwHeVNrR6mWtxai2GEJgFXc02VC6Vj23HRsWBfRshdTy9xuRItuwd5_ErJJXlwr3EsAJ29s9WzOvU9-DP14zqeyFbQV0FdCuKbIjsrNOFvX4SnUKHyaTnUwynOleuTjZvVd0tkODWBqdFS9plNbqbZoCOMExbr-MFgV7ouVlTJ7-BAFT6AgrSSWgLyxL7obIEb4N9lBoBME4NZwpYIkms7uzpq4dY-0p3bFYmt1k2pJ4wLuLs9FLzdc3-k8qSrWEfeICJPG8i-w",
                description: "Renowned Moroccan Gnawa master musician known for his deep voice and guembri playing."
            },
            {
                name: "Mahmoud Guinia",
                photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0FBrzdkwPxiDIA2r95dDDsYtxJPcBTUMK6M__rMQJZw1TvR6icmMYyYk2D-MmOeGdJNP9Ic8tbEbckBkx-XBbNHZOn4fSRr3wXF8pM2dI3KDA2c9fFKYCpFHQDzuRzh7X0OSURppi2eUr0EWgKe7gyDIoBHi8rKt9BjggybGi5LRLYtn3BcgvntVA7iFe-nuG1td5o91XMGyMEeGdDwUMb7BpMBAJRWsbE5I7qvhhyzxjQjPUthNVN5AmbxK48nodZnLKfjxx3A",
                description: "Legendary Gnawa master from Essaouira and hugely influential figure in the tradition."
            },
            {
                name: "Hassan Boussou",
                photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgtrVECw_WW7H5BmpOVxtjujNc0FMomnvvzpL4NK0iNbwQDnAuvpLM6byxEDMS8MBM6Fa4Cr6hkhb_Vf_opeMzM_zjSBxcqD3IgYXLcF4_NnD6tnOz1N45CwMZ9_XpqFhTs5dy8wYCdTmsJrniZshe6w5MGpBDBj-NPWX1gQuow4Ry4xBpPNda-KsaqDk5HzLtvHEqHM9hnxuRNkUIcSgBWB6C5TncSqpovMTJp_QOLP2RbzhcGxjbQsoWM58-OT4hUPbPw_u3Ug",
                description: "One of the first prominent female Gnawa musicians, leader of Bnat Timbouktou."
            },
            {
                name: "Hassan el bahi",
                photo: "https://i.pinimg.com/736x/27/18/fd/2718fdcd2e6364f2890d8ee102e8e60c.jpg",
                description: "Moroccan Gnawa singer and musician, known for breaking gender barriers in the genre."
            },
            {
                name: "Hassan Hakmoun",
                photo: "https://i.pinimg.com/736x/6a/5c/99/6a5c9980af35c1c4cfa694c0b63544b2.jpg",
                description: "Moroccan musician specializing in Gnawa music, noted for fusion and world music collaborations."
            }, {
                name: "Mahmoud Guinia",
                photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCt-ycw_ohWqG6cbk6_p79Je1fgFjqbysuscweYb4nVxcWHkeF154fIiWRfR3FhBNK40vJ2LTvcJDW9x0suoUFJivaSGeDSv-seafAF9Gu3eoHPZNWRGxmf6vY5Mcf37bryVjYdOU_yW4VqRcLhzO5ICCKNuNYhWGbx9cUAh6PbB-F6tVaSelEcC7Lodf3qAMw6Vwd9-vcmOjLe-LF6tvujFQU0c0sCvIIW2KPMGWexKCXEJVxaf2Q80p_KaYQA89Cs6yJPncdlWQ",
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
