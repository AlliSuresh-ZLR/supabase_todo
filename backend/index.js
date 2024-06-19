const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(cors());
app.use(express.json());

app.post('/todos', async (req, res) => {
  const { text,status } = req.body;
  const {  error } = await supabase.from('todos').insert([{ text,status }]);
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({message:"new entry added"});
});

app.get('/todos', async (req, res) => {
  const { data, error } = await supabase.from('todos').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { text ,status} = req.body;
  const { data, error } = await supabase.from('todos').update({ text,status }).eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({message:"updated successfully"});
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('todos').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
