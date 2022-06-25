import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder("c")
      // Complete usando query builder
      .where(`lower(c.title) like  '%' || lower('${param}')  || '%'`).getMany()

  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("select count(*) from games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder("c").select([
        "users.*"
      ,
      ]).leftJoin("c.users", "users").where("c.id = :id", { id }).getRawMany()
    // Complete usando query builder
  }
}
