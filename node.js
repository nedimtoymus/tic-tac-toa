import express from "express";

import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";

const app = express();
let port = 3010;

dotenv.config();

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// Asenkron fonksiyon oluştur
async function createAssistant(req, res) {
  //yeni asistan oluştur
  const assistant = await openai.beta.assistants.create({
    name: "sen-bir-tic-tac-toe-oyuncususun",
    instructions:
      'Let\'s play tic tac toe with you on a 3x3 board, we will play the game in array format (["","","","","","","","",""]), write your move in the array I send you and send it back if you are ready, let\'s start give your answers only as an array  (I know you are a text-based AI, let\'s play this game text-based) You are the best xox player in the world, don\'t forget that.  and calculate at least 20 forward moves',
    model: "gpt-4-1106-preview",
  });

  res.json(assistant);
}

app.get("/create-assistant", async (req, res) => {
  await createAssistant(req, res);
});

app.options("/move", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});

app.get("/move", async (req, res) => {
  await move(req, res);
});

async function move(req, res) {
  try {
    const { board } = req.query; // Query parametresinden tahta bilgisini alın

    // Gelen tahta bilgisini doğrudan kullanabilir veya belirli bir formata dönüştürebilirsiniz
    console.log(board);

    // ChatGPT'ye gönderilecek olan giriş metni oluşturuluyor, board verisi burada kullanılabilir

    const thread = await openai.beta.threads.create();
    const message = await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: board,//'["X","O","","","","","","",""]',
    });

    let run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID,
      instructions: "",
    });

    run = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    while (run.status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      run = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      console.log(run);
    }
    const messages = await openai.beta.threads.messages.list(thread.id);
    let response = messages.data[0].content;
    console.log(messages);
    console.log(messages.data[0].content);

    // Cevabı geri döndür
    res.status(200).json({ response });
  } catch (error) {
    console.log(error.message);
    // Hata durumunda uygun yanıtı gönder
    res.status(500).json({ error: error.message || "Server error" });
  }
}

/*async function move(req, res) {
  try {
    const { board } = req.body; // Gelen tahta bilgisini alın, gelen veriye göre düzenleme yapılabilir
    console.log(board);
    // ChatGPT'ye gönderilecek olan giriş metni oluşturuluyor, board verisi burada kullanılabilir
    const inputText = `Player moved ${board}`; // Örnek bir giriş metni

    // ChatGPT ile etkileşim için istek oluşturma
    const chatGPTResponse = await openai.complete({
      model: "gpt-4", // Kullanılacak model adı
      prompt: inputText,
      max_tokens: 100, // Cevap için maksimum token sayısı
    });

    const { choices } = chatGPTResponse.data;
    const response = choices[0].text.trim(); // ChatGPT'nin cevabı

    console.log(response);

    // Cevabı geri döndür
    res.status(200).json({ response });
  } catch (error) {
    // Hata durumunda uygun yanıtı gönder
    res.status(500).json({ error: error.message || "Server error" });
  }
}*/

app.use(cors());
app.listen(port, () => console.log(`Server running on port ${port}`));
