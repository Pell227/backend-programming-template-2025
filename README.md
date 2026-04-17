# Backend Programming Template (2025)

## penjelasan Quiz

1. POST localhost:5000/api/prize
   Parameter/input:
   {
   "name" : "Emas 10 gram",
   "quota" : 1,
   "droprate" : 0.01
   }
   Penjelasan : untuk menambahkan data hadiah kedalam query yang dinamakan reward sesuai dengan schema yang sudah ditentukan di prize-schema.js, dimana ketika ada parameter yang kurang maka akan menampilkan pesan error yang mengharuskan user untuk menginput 3 data tersebut.

2.POST localhost:5000/api/gacha/play
Parameter/input :
{
"username" : "John Doe"
}
penjelasan: untuk melakukan gacha yang ada kemungkinan memperorleh hadiah yang sudah dimasukan ke prize-schema.js sesuai dengan drop rate yang sudah ditentukan, namun ketika sudah melakukan gacha sebanyak 5x, maka jatah gacha untuk username itu sudah mencapai limit/batasan.

3.GET localhost:5000/api/gacha/history/:username
Parameter/input : username yang ingin dicari, contoh : localhost:5000/api/gacha/history/Nine

penjelasan: Untuk menampilkan history gacha yang sudah dilakukan oleh username yang dicari serta menampilkan hadiah yang diperoleh dari username yang dicari oleh user

4.GET localhost:5000/api/gacha/prizes/quota
Penjelasan : untuk menampilkan list hadiah yang masih tersedia, menampilkan quota yang sudah memperoleh hadiah tersebut serta sisa quota yang ada kecil kemungkinan untuk memperoleh hadiah tersebut

5.GET localhost:5000/api/gacha/winners
Penjelasan : endpoint ini akan menampilkan daftar user yang berhasil memenangkan hadiah yang sudah dimasukan kedalam mongodb, serta menyamarkan nama pemenang secara acak.

## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`. Open `.env` and change the database connection string.
5. Run `npm install` to install the project dependencies.
6. Run `npm run dev` to start the dev server.
7. Test the endpoints in the API client app.

## Add New API Endpoints

1. Create a new database schema in `./src/models`.
2. Create a new folder in `./src/api/components` (if needed). Remember to separate your codes to repositories, services, controllers, and routes.
3. Add the new route in `./src/api/routes.js`.
4. Test your new endpoints in the API client app.
