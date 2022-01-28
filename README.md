### Requirements

[Deno](https://deno.land/#installation), [Dart](https://dart.dev/get-dart),
[Dart SASS](https://github.com/sass/dart-sass#using-dart-sass) and optionally
[Docker](https://docs.docker.com/engine/install/) with
[Docker compose](https://docs.docker.com/compose/install/)

<details>
  <summary>Installation on Windows with choco</summary>

```powershell
choco install Deno dart-sdk
pub global activate sass
```

Now add Dart library to path _C:\Users\[USERNAME]\AppData\Local\Pub\Cache\bin_

Restart command line/powershell to get access to these new programs in your PATH

**Optionally install Docker and Docker compose for faster local instance
deployment** [Docker for Desktop]() already has Docker compose inside (run with
`docker compose up`)

```powershell
choco install docker-desktop
```

</details>

<details>
  <summary>Installation on Linux</summary>

**Install Deno**

```bash
curl -fsSL https://deno.land/x/install/install.sh | sh
echo 'export PATH="$HOME/.deno/bin:$PATH"' >> ~/.bashrc
```

**Install Dart**

```bash
sudo apt update
sudo apt install apt-transport-https
sudo sh -c 'wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -'
sudo sh -c 'wget -qO- https://storage.googleapis.com/download.dartlang.org/linux/debian/dart_stable.list > /etc/apt/sources.list.d/dart_stable.list'
sudo apt update
sudo apt install dart
dart --disable-analytics
```

**Install Dart Sass**

```bash
dart pub global activate sass
echo 'export PATH="$HOME/.pub-cache/bin:$PATH"' >> ~/.bashrc
```

**Optionally install Docker and Docker compose for faster local instance
deployment**

Docker:

```bash
sudo snap install docker
```

Docker compose:

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

</details>

<details>
  <summary>Installation on Mac with brew</summary>

**Install Deno**

```bash
brew install deno
```

**Install SASS**
```bash
brew install sass/sass/sass
```

</details>

### To start developing

Run the script to process JS and SCSS files (this needs to be done before you
can use the theme).

```bash
deno run --allow-run --allow-read --allow-write --unstable start.ts
```

Run docker-compose to have local WordPress instance running with no hassle, and
your theme installed (but you'll have to go through setup of fresh WP
installation).

```bash
docker-compose up
```
TODO: This WP installation will be broken again when docker restarts.
TODO: Make content for the web, that will be then exported and added to the repo, so it could be imported with the installation.
TODO: There is also a Important Pluggin missing from default installation (WP REST API Menus)
TODO: When you add a static page as "homepage" it should already contain some prefilled blocks