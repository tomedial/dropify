import { EntityRepository, Repository } from 'typeorm';
import { Connection } from '../entity/connection';

export class ConnectionRepository extends Repository<Connection> {
  // Add custom methods and queries here
}