import { Command, Flags } from '@oclif/core';
import { Client, Intents } from 'discord.js';
import mongoose from 'mongoose';
import Coach from '../../coach/Coach';

export default class DiscordBot extends Command {
  static description = 'Run our "TRUSTED" Coach';

  static examples = [
    '$ oex serve --token OTgyMDA1Mzc2NDU3MjY1MTYy.GYnLT-.1pbk4anc9qa1G-MuOW7ABOQX3id53_73Ev9T5w --dev',
  ];

  static flags = {
    token: Flags.string({ char: 't', description: 'Discord bot token', required: true }),
    dbCon: Flags.string({ char: 'c', description: 'Database (MongoDB) connection string', required: true }),
    dev: Flags.boolean({ char: 'd', description: 'Should run as dev behavior' }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(DiscordBot);
    const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
    this.log('Auth-ing <-> Discord by given token');
    client.login(flags.token);
    client.once('ready', async () => {
      this.log('Login succeed');
      await mongoose.connect(flags.dbCon);
      (new Coach(client)).onDuty();
    });
  }
}
