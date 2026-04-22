/* eslint-disable */
const fs = require('fs');
const https = require('https');

const screens = [
  { name: "Onboarding_Permissions", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2M2MDM1YmE4NzViNzRiNzc5ZDVlMGU1M2VhZGQxYTcxEgsSBxCZ6KrO6BcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTQ5MzAxMjkzMTE2Mjk2MzQ4OQ&filename=&opi=89354086" },
  { name: "Flight_Logger", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzk4MGJmNGU5MmZiNDRhOGQ5YjE5NGY5M2JiNGY4MjBhEgsSBxCZ6KrO6BcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTQ5MzAxMjkzMTE2Mjk2MzQ4OQ&filename=&opi=89354086" },
  { name: "Flight_Path_PRD.md", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2JkZjU1MTM1MTIyYjQyMjM4YmYwMDU3YjY1YjZiNTVhEgsSBxCZ6KrO6BcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTQ5MzAxMjkzMTE2Mjk2MzQ4OQ&filename=&opi=89354086" },
  { name: "Onboarding_Utility", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzI0YzNiOWM1MjU2YzQyMDc5YzYwYzE5NjRlNjFmNDM1EgsSBxCZ6KrO6BcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTQ5MzAxMjkzMTE2Mjk2MzQ4OQ&filename=&opi=89354086" },
  { name: "Onboarding_Gamification", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2RlMDUwZDc5YmE2YjQ2YmM4MmZjZjk4OTAyYjYxMzBhEgsSBxCZ6KrO6BcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTQ5MzAxMjkzMTE2Mjk2MzQ4OQ&filename=&opi=89354086" },
  { name: "Journey_Timeline", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzljNzY2NDg3NmU0YzQyYmNhZTgxNDMxZDc5YjJiMmE1EgsSBxCZ6KrO6BcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTQ5MzAxMjkzMTE2Mjk2MzQ4OQ&filename=&opi=89354086" },
  { name: "Onboarding_Welcome", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzljN2YyNTliNjYzZTQxYzU5NGQ1N2I1OTQ2MGQwYzZiEgsSBxCZ6KrO6BcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTQ5MzAxMjkzMTE2Mjk2MzQ4OQ&filename=&opi=89354086" },
  { name: "Virtual_Passport", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzBmYjdjNDQ4ODU5ZjQyNzM5ZjEwODA3NGQ5NTZmNjMzEgsSBxCZ6KrO6BcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTQ5MzAxMjkzMTE2Mjk2MzQ4OQ&filename=&opi=89354086" },
  { name: "Onboarding_Auth_Setup", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzVjMjllZmE1NzZkNTRlOTg5YTg4NmIyZTkyYjdhNDJkEgsSBxCZ6KrO6BcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTQ5MzAxMjkzMTE2Mjk2MzQ4OQ&filename=&opi=89354086" },
  { name: "3D_Globe_Dashboard", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzgxMzExZjNmYzc3MDRjMmQ5OGEwMDAwMThmNDA0NDRmEgsSBxCZ6KrO6BcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTQ5MzAxMjkzMTE2Mjk2MzQ4OQ&filename=&opi=89354086" }
];

screens.forEach(screen => {
  const filename = screen.name.endsWith('.md') ? screen.name : `${screen.name}.html`;
  const file = fs.createWriteStream(filename);
  https.get(screen.url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${filename}`);
    });
  }).on('error', err => {
    fs.unlink(filename, () => {});
    console.error(`Error downloading ${filename}: ${err.message}`);
  });
});
