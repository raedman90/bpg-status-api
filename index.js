import express from "express";
import cors from "cors";
import query from "samp-query";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("✅ API do Brasil Play Games está online!");
});

app.get("/sampstatus", (req, res) => {
  const options = {
    host: "bpg.brasilplaygames.com.br", // coloque o IP do servidor
    port: 7777,
    timeout: 1000
  };

  query(options, (error, response) => {
    if (error) {
      console.error("Erro ao consultar o servidor:", error);
      return res.status(500).json({ error: "Não foi possível obter status do servidor." });
    }

    res.json({
      hostname: response.hostname,
      ip: `${options.host}:${options.port}`,
      players: response.online,
      maxPlayers: response.maxplayers,
      ping: response.rtime ?? null,
      mode: response.gamemode,
      map: response.mapname
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});
