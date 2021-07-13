### Requirements
[Deno](https://deno.land/#installation)
[Dart](https://dart.dev/get-dart)
[Dart SASS](https://github.com/sass/dart-sass#using-dart-sass)

<details>
  <summary>Installation on Windows with choco</summary>

```powershell
choco install Deno dart-sdk
pub global activate sass
```
Now add Dart library to path *C:\Users\[USERNAME]\AppData\Local\Pub\Cache\bin*

Restart command line/powershell to get access to these new programs in your PATH
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

Now add Dart library to path *C:\Users\[USERNAME]\AppData\Local\Pub\Cache\bin*
</details>

### Available CLI commands
```bash
deno run -A start.ts
```
