import click
from pymongo import MongoClient


@click.command()
@click.option('--mongo-ip', default='127.0.0.1', help='Database address')
@click.option('--email', required=True, help='Email of person you want invite')
def cli(mongo_ip, email):
    client = MongoClient(mongo_ip, 27017)
    db = client.sobe
    invites = db.sessions
    invites.insert({
        'invite': email,
        'valid': True,
        'score': 0,
        'currentQuestion': 1
    })

    active_count = invites.find({'valid': True}).count()
    click.echo('Total accounts {total_count}'.format(
        total_count=invites.count()))
    click.secho('Active accounts {active_count}'.format(
        active_count=active_count), fg='yellow')

    click.secho('Link to web site:', bold=True)
    click.secho('http://sobe.bwmlog.pp.ua?invite={email}'.format(
        email=email
    ), fg='green')


if __name__ == '__main__':
    cli()
